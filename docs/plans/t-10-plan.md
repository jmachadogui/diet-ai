# T-10 Plan — Core Pipeline: Message Processing Worker

**Task:** T-10  
**PRD refs:** FR-4, FR-5, FR-6, FR-6a, FR-7, FR-11, FR-11a, NFR-1, NFR-1a  
**Depends on:** T-04, T-05, T-06, T-07, T-09 (all complete)  
**Branch:** `feat/t-10-core-pipeline-message-processing-worker`

---

## Overview

Implement the end-to-end message processing pipeline via a BullMQ worker. When a chat message arrives via any `MessagingAdapter`, the adapter enqueues a `message-process` job. The worker picks it up and runs the full pipeline:

1. Create a `Log` record.
2. Resolve the parsed LLM result (with clarification logic from `tdd.md §5.6`).
3. Route by intent (`log_meal`, `edit_meal`, `summary`, `other`).
4. For `log_meal`: look up nutrition for each item, persist `Meal` + `MealItem` records, reply to user.
5. On any error: mark the log as failed and send an error reply.

The clarification flow (FR-6) is implemented inside `resolveParsedResult()` using Redis as ephemeral state storage (TTL 300s). Abandoned clarifications are detected when the next message arrives and the Redis key has expired.

---

## Files to Create

| File | Purpose |
|---|---|
| `apps/api/src/workers/messageProcessor.ts` | BullMQ worker — full pipeline implementation |
| `apps/api/src/workers/index.ts` | Worker bootstrap — instantiates and starts the worker |
| `apps/api/src/services/mealService.ts` | `createMealFromItems()`, `getDailySummary()` |
| `apps/api/src/services/logService.ts` | `createLog()`, `updateLogSuccess()`, `updateLogFailed()`, `setClarificationPrompt()`, `setClarificationResponse()` |
| `apps/api/src/__tests__/messageProcessor.integration.test.ts` | Integration test — full happy path with mocked LLM + FatSecret |

## Files to Modify

| File | Change |
|---|---|
| `apps/api/src/index.ts` | Import and start the worker; wire `onMessage` handler on each adapter to enqueue jobs |
| `packages/messaging/src/adapters/telegram.ts` | Ensure `onMessage` handler is called for all non-command messages (not just `/start`) |

---

## Step-by-Step Implementation

### Step 1 — Create `LogService`

**File:** `apps/api/src/services/logService.ts`

Thin wrapper over the `Log` repository helpers from `packages/db`. Keeps raw Prisma calls out of the worker.

Responsibilities:
- `createLog(data)`: insert a `Log` row with `processingStatus: "processing"`. Returns the created log.
  - Fields: `userId`, `platform`, `platformMessageId`, `messageTimestamp`, `rawText`.
- `updateLogSuccess(logId, data)`: set `processingStatus: "success"`, `llmOutput`, `intent`, `latencyMs`.
- `updateLogFailed(logId, data)`: set `processingStatus: "failed"`, `errorCode`, `errorMessage`.
- `setClarificationPrompt(logId, prompt)`: set `clarificationPrompt` on the log.
- `setClarificationResponse(logId, response)`: set `clarificationResponse` on the log.
- `markLogAbandoned(logId)`: set `processingStatus: "abandoned"`.

All methods call repository helpers from `packages/db` — no raw Prisma calls here.

---

### Step 2 — Create `MealService`

**File:** `apps/api/src/services/mealService.ts`

Responsibilities:
- `createMealFromItems(data)`:
  1. Accept `userId`, `sourceLogId`, `occasion`, `consumedAt`, and an array of resolved nutrition items.
  2. Aggregate totals: `totalCalories`, `totalProteinG`, `totalCarbsG`, `totalFatG` by summing across all items.
  3. Create a `Meal` record via the db repository.
  4. Create one `MealItem` record per item via the db repository, storing `foodName`, `quantity`, `unit`, `calories`, `proteinG`, `carbsG`, `fatG`, `nutritionApi`, `apiRefId`, `apiResponseSnapshot`, `resolutionConfidence`.
  5. Return the created `Meal` with its items.
- `getDailySummary(userId, date)`:
  1. Query all `Meal` records for `userId` where `consumedAt` falls within the given date (midnight to midnight in UTC).
  2. Sum `totalCalories`, `totalProteinG`, `totalCarbsG`, `totalFatG` across all meals.
  3. Fetch `User.dailyCalorieGoal`.
  4. Return the aggregated totals and goal.

All DB access goes through repository helpers from `packages/db`.

---

### Step 3 — Implement `messageProcessor.ts` Worker

**File:** `apps/api/src/workers/messageProcessor.ts`

This is the core of T-10. Structure:

#### 3a — Job type definition

```typescript
interface MessageProcessJob {
  userId: string;
  logId: string;
  rawText: string;
  platform: Platform;
  platformUserId: string;
  platformMessageId: string;
  messageTimestamp: string; // ISO string — Date is not serializable in BullMQ
}
```

#### 3b — `resolveParsedResult()` (clarification logic — `tdd.md §5.6`)

Implement exactly as specified in `tdd.md §5.6`:

1. Check Redis for key `clarification:<userId>`.
2. **If key exists (clarification response path):**
   - Parse stored `{ logId, originalText, question }`.
   - Combine: `"<originalText>\n\nUser clarification: <rawText>"`.
   - Call `llmProvider.parseMessage(combined)`.
   - Delete the Redis key.
   - Call `logService.setClarificationResponse(logId, rawText)`.
   - If the re-parse still has `needs_clarification: true`, set `isFallback: true` and log a warning.
   - Return `{ result, isFallback }`.
3. **If key does not exist (first parse path):**
   - Call `llmProvider.parseMessage(rawText)`.
   - If `needs_clarification: true`:
     - Store Redis key `clarification:<userId>` with TTL 300s, value `{ logId, originalText: rawText, question: clarification_question }`.
     - Call `logService.setClarificationPrompt(logId, clarification_question)`.
     - Call `messagingAdapter.sendMessage(clarification_question)`.
     - Return `{ result, isFallback: false }` — **caller must check `result.needs_clarification` and stop processing**.
   - Otherwise return `{ result, isFallback: false }`.

#### 3c — Abandoned clarification detection

At the start of every job, before calling `resolveParsedResult()`:
- Check Redis for `clarification:<userId>`.
- If the key **does not exist** but the previous log for this user had `processingStatus: "processing"` with a `clarificationPrompt` set, that log was abandoned.
- Detect this by checking: if there is no Redis key and the incoming message is not a clarification response, look up the most recent `Log` for this user with `processingStatus: "processing"` and a non-null `clarificationPrompt`. If found, call `logService.markLogAbandoned(pendingLogId)`.

> Note: The Redis TTL expiry is the source of truth for abandonment. The DB check is only needed to update the log status.

#### 3d — Main worker handler

```
async function processMessage(job: Job<MessageProcessJob>):
  1. Record startTime = Date.now()
  2. Look up userId from UserIdentity (platform + platformUserId)
     - If not found: send "Please link your account first" reply; return (no Log created)
  3. Create Log record (processingStatus: "processing")
     - Update job data with logId
  4. Call resolveParsedResult()
     - If result.needs_clarification === true (first parse, clarification sent): return early
  5. Route by intent:
     - "log_meal"  → runLogMealFlow()
     - "edit_meal" → runEditMealFlow()   (stub returning "not yet implemented" for T-10; T-12 implements this)
     - "summary"   → runSummaryFlow()    (stub returning "not yet implemented" for T-10; T-13 implements this)
     - "other"     → send generic reply; update log status "success"
  6. On any unhandled error:
     - Call logService.updateLogFailed(logId, { errorCode, errorMessage })
     - Send error reply to user
```

#### 3e — `runLogMealFlow()`

```
1. For each item in result.items:
   a. Call nutritionProvider.lookup({ food_name, quantity, unit })
   b. Collect NutritionResult
2. Determine consumedAt:
   - Use result.consumed_at if non-null
   - Otherwise use job.messageTimestamp
3. Call mealService.createMealFromItems({
     userId, sourceLogId: logId, occasion: result.meal_occasion,
     consumedAt, items: resolvedNutritionResults
   })
4. Calculate latencyMs = Date.now() - startTime
5. Call logService.updateLogSuccess(logId, { llmOutput: result, intent: "log_meal", latencyMs })
6. Format reply: "Logged: <meal summary with total calories and macros>"
7. Call messagingAdapter.sendMessage(reply)
```

On `NutritionAPIError`:
- Call `logService.updateLogFailed(logId, { errorCode: "NUTRITION_API_ERROR", errorMessage })`.
- Send: "Unable to fetch nutrition data right now. Please try again later."
- Do **not** create a `Meal` record.

#### 3f — Intent stubs for T-10 scope

`runEditMealFlow()` and `runSummaryFlow()` are implemented as stubs in T-10:
- Update log with `processingStatus: "success"` and the correct intent.
- Reply with a placeholder message.
- Full implementation comes in T-12 and T-13 respectively.

---

### Step 4 — Worker Bootstrap

**File:** `apps/api/src/workers/index.ts`

- Instantiate a BullMQ `Worker` on the `message-process` queue.
- Pass the Redis connection from `REDIS_URL`.
- Set concurrency from `QUEUE_CONCURRENCY` env var (default 5).
- Configure retry: 2 retries with exponential backoff (`attempts: 3`, `backoff: { type: "exponential", delay: 1000 }`).
- Export a `startWorkers(adapters, llmProvider, nutritionProvider)` function called from `apps/api/src/index.ts`.

---

### Step 5 — Wire `onMessage` in `apps/api/src/index.ts`

**File:** `apps/api/src/index.ts`

After initializing adapters:
1. For each active `MessagingAdapter`, call `adapter.onMessage(async (msg) => { ... })`.
2. Inside the handler:
   - Enqueue a `message-process` job on the BullMQ queue with the `IncomingMessage` fields mapped to `MessageProcessJob`.
   - The `logId` field is initially empty — the worker creates the Log and has access to the job data via `job.updateData()` or stores logId in a separate step.
3. Call `startWorkers(adapters, llmProvider, nutritionProvider)`.

> Per `tdd.md §9` and AGENTS.md: never call the LLM or nutrition API synchronously inside the webhook handler. The handler only enqueues the job.

---

### Step 6 — Write Integration Test

**File:** `apps/api/src/__tests__/messageProcessor.integration.test.ts`

Use Jest with mocked HTTP calls (via `jest.mock` or `msw`) for LLM and FatSecret. Use a real Prisma client against a test DB (or mock the repository layer).

**Scenarios to cover:**

1. **Happy path — meal log:**
   - Input: `"I had 200g grilled chicken and a banana for lunch"`
   - Mock LLM returns: `{ intent: "log_meal", meal_occasion: "lunch", items: [{food_name: "grilled chicken", quantity: 200, unit: "g"}, {food_name: "banana", quantity: 1, unit: "unit"}], needs_clarification: false }`
   - Mock FatSecret returns nutrition data for each item.
   - Assert: `Log` created with `processingStatus: "success"`, `latencyMs` populated.
   - Assert: `Meal` created with `occasion: "lunch"`, correct aggregated totals.
   - Assert: Two `MealItem` records with `nutritionApi`, `apiRefId`, and macro values.
   - Assert: Reply sent to user with meal summary.

2. **Unlinked user:**
   - Input: message from a `platformUserId` with no `UserIdentity` row.
   - Assert: No `Log` created.
   - Assert: Reply sent with account linking instructions.

3. **Nutrition API failure:**
   - Mock FatSecret throws `NutritionAPIError`.
   - Assert: `Log.processingStatus: "failed"`, `errorCode: "NUTRITION_API_ERROR"`.
   - Assert: No `Meal` created.
   - Assert: Error reply sent to user.

4. **Clarification flow (unit test level):**
   - First message: mock LLM returns `needs_clarification: true`.
   - Assert: Redis key set, clarification question sent, no `Meal` created.
   - Second message (clarification response): mock LLM returns resolved result.
   - Assert: Redis key deleted, `Log.clarificationResponse` set, `Meal` created.

---

### Step 7 — Build and Test

```bash
pnpm --filter @diet-ai/api build
pnpm --filter @diet-ai/api test
pnpm build
pnpm test
```

All must pass with no TypeScript errors.

---

## Key Design Decisions

- **No synchronous LLM/nutrition calls in webhook handler:** The `onMessage` handler only enqueues a BullMQ job. All heavy work happens in the worker (AGENTS.md, `tdd.md §9`).
- **Redis for clarification state:** Clarification state is ephemeral and session-scoped. Redis TTL (300s) is the authoritative expiry mechanism. The DB is only updated for audit purposes.
- **`resolveParsedResult()` returns early on clarification:** When a clarification question is sent, the worker returns without creating a `Meal`. The next message from the same user is treated as the clarification response.
- **Abandoned log detection:** When a new message arrives and no Redis clarification key exists, any prior `Log` with `processingStatus: "processing"` and a non-null `clarificationPrompt` is marked `"abandoned"`.
- **`consumedAt` fallback:** If the LLM does not extract a time, `messageTimestamp` from the job payload is used as `consumedAt` (FR-5).
- **Edit and summary stubs:** `runEditMealFlow()` and `runSummaryFlow()` are stubs in T-10. Full implementations are in T-12 and T-13 respectively. This keeps T-10 focused and unblocks T-11.
- **Repository pattern:** All DB access in `LogService` and `MealService` goes through repository helpers from `packages/db` — no raw Prisma calls in service files (AGENTS.md).
- **BullMQ retry config:** 3 total attempts (1 initial + 2 retries) with exponential backoff starting at 1s, covering transient LLM and nutrition API network errors (`tdd.md §9`).
- **`isFallback` warning:** When the re-parse after a clarification response still returns `needs_clarification: true`, the worker logs a warning and proceeds with the best-guess items from the re-parse result. No second clarification question is sent (FR-6).

---

## Definition of Done Checklist

- [ ] Sending "I had 200g grilled chicken and a banana for lunch" via Telegram results in:
  - A `Log` record with `rawText`, `llmOutput`, `processingStatus: "success"`, and `latencyMs` populated.
  - A `Meal` record with `occasion: "lunch"` and correct aggregated `totalCalories`, `totalProteinG`, `totalCarbsG`, `totalFatG`.
  - Two `MealItem` records, each with `nutritionApi`, `apiRefId`, and macro values.
  - A reply in Telegram summarising the logged meal and total calories.
- [ ] A message from an unlinked Telegram account replies with instructions to link the account; no `Log` is created.
- [ ] A nutrition API failure sets `Log.processingStatus: "failed"` and sends an error reply; no `Meal` is created.
- [ ] Integration test covers the full happy path with mocked LLM and FatSecret HTTP calls.
- [ ] `pnpm --filter @diet-ai/api build` passes with no TypeScript errors.
- [ ] `pnpm --filter @diet-ai/api test` passes — all tests green.
- [ ] `pnpm build` and `pnpm test` pass across all packages.
