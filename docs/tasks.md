# MVP Task Breakdown

**Project:** Natural Language Calorie Tracker (MVP)
**Related docs:** `prd.md`, `tdd.md`, `calorie_tracker_erd.md`

Tasks are ordered by dependency. A task should not be started until all tasks it depends on are done.

---

## T-01 — Monorepo Scaffolding

**PRD refs:** foundation for all FRs
**Depends on:** —

**Scope**
- Initialize `pnpm` workspace with `pnpm-workspace.yaml`.
- Create folder structure: `apps/api`, `apps/web`, `packages/shared`, `packages/db`, `packages/llm`, `packages/nutrition`, `packages/messaging`.
- Add root `tsconfig.base.json` with strict TypeScript config.
- Add per-package `tsconfig.json` extending the base.
- Add per-package `package.json` with correct `name` (`@diet-ai/*`), `main`, and `types` fields.
- Add root `package.json` with workspace scripts: `dev`, `build`, `test`, `lint`.
- Add `.env.example` with all variables from `tdd.md §14`.
- Add `infra/docker-compose.yml` for PostgreSQL and Redis.
- Configure `jest` + `ts-jest` at the root with per-package test discovery.

**Definition of Done**
- [ ] `pnpm install` runs without errors from the root.
- [ ] `pnpm --filter @diet-ai/api dev` starts without errors (even if the server does nothing yet).
- [ ] `pnpm test` runs Jest and exits cleanly (zero tests is acceptable at this stage).
- [ ] `pnpm build` compiles all packages without TypeScript errors.
- [ ] `infra/docker-compose.yml` starts PostgreSQL on port 5432 and Redis on port 6379 via `docker compose up -d`.

---

## T-02 — Prisma Schema & Database Setup

**PRD refs:** FR-11, FR-11a, FR-12a, FR-14a, NFR-7, NFR-8a
**Depends on:** T-01

**Scope**
- Write the full Prisma schema in `packages/db/prisma/schema.prisma` mapping every entity from the ERD: `User`, `UserIdentity`, `MagicLinkToken`, `Log`, `Meal`, `MealItem`, `ApiCache`, `UserWeightHistory`, `EditHistory`.
- Apply all field types, constraints, and indexes described in `tdd.md §6.1`.
- Create the first migration via `prisma migrate dev`.
- Export a singleton `prisma` client from `packages/db/src/index.ts`.
- Add thin repository helpers for each entity (typed wrappers over Prisma calls).

**Definition of Done**
- [ ] `prisma migrate dev` applies cleanly against a local PostgreSQL instance.
- [ ] `prisma generate` produces a fully-typed client with no errors.
- [ ] All ERD entities and relationships exist in the DB (verified via `psql` or Prisma Studio).
- [ ] Composite unique constraints are in place: `UserIdentity(platform, platformUserId)`, `MagicLinkToken(token)`, `ApiCache(normalizedQueryHash)`.
- [ ] Indexes exist on `Log(userId, createdAt)` and `Meal(userId, consumedAt)`.
- [ ] Repository helpers are exported and typed; calling them from a test file compiles without errors.

---

## T-03 — `packages/shared` — Zod Schemas & Common Types

**PRD refs:** FR-5, FR-13
**Depends on:** T-01

**Scope**
- Define and export the following Zod schemas:
  - `MealParseResultSchema` — LLM parse output (intent, items, clarification fields, consumed_at, meal_occasion).
  - `EditInstructionSchema` — LLM edit output (target meal, operations array).
  - `NutritionQuerySchema` and `NutritionResultSchema`.
  - `IncomingMessageSchema` and `OutgoingMessageSchema`.
  - `PlatformEnum` (`telegram` | `whatsapp` | `discord`).
  - `MealOccasionEnum`, `IntentEnum`.
- Export inferred TypeScript types alongside each schema.

**Definition of Done**
- [ ] All schemas compile with no TypeScript errors.
- [ ] Each schema has at least one passing unit test covering a valid input and one invalid input.
- [ ] Inferred types (`z.infer<typeof ...>`) are exported and usable in other packages without type errors.

---

## T-04 — `packages/llm` — LLM Provider Abstraction & AbacusAI Implementation

**PRD refs:** FR-5, FR-6, FR-6a, FR-7
**Depends on:** T-03

**Scope**
- Define the `LLMProvider` interface (`packages/llm/src/provider.ts`).
- Implement `AbacusAIProvider` using the `openai` npm package with `baseURL: https://routellm.abacus.ai/v1`.
- Implement `buildParseSystemPrompt(todayISO, userTime)` from `tdd.md §5.5.1`.
- Implement `buildEditSystemPrompt(todayISO, mealsContext)` from `tdd.md §5.5.2`.
- Validate LLM response against `MealParseResultSchema` / `EditInstructionSchema`; throw typed `LLMParseError` on failure.
- Implement the provider factory function reading `LLM_PROVIDER` env var.
- Use model names from `LLM_MODELS` config (`tdd.md §5.4`).

**Definition of Done**
- [ ] `AbacusAIProvider.parseMessage()` returns a valid `LLMParseResult` when called with a real API key (manual smoke test).
- [ ] Unit tests with mocked HTTP client cover:
  - Valid JSON response → correctly parsed and returned.
  - Malformed JSON response → `LLMParseError` thrown.
  - Schema mismatch response → `LLMParseError` thrown.
  - `needs_clarification: true` response → `clarification_question` is populated.
- [ ] `buildParseSystemPrompt` injects `TODAY_ISO` and `USER_TIME` correctly.
- [ ] `buildEditSystemPrompt` injects `TODAY_ISO` and serializes `mealsContext` correctly.
- [ ] Provider factory returns `AbacusAIProvider` when `LLM_PROVIDER=abacusai`.

---

## T-05 — `packages/nutrition` — Nutrition Provider Abstraction & FatSecret Implementation

**PRD refs:** FR-8, FR-9, FR-9a, FR-10, FR-10b
**Depends on:** T-03

**Scope**
- Define the `NutritionProvider` interface (`packages/nutrition/src/provider.ts`).
- Implement `FatSecretProvider`:
  - OAuth 2.0 Client Credentials token fetch; cache token in-memory with expiry.
  - `foods.search` call with `food_name`.
  - `food.get` call with matched `food_id`.
  - Per-gram normalization from FatSecret serving data, scaled to user `quantity` + `unit`.
  - Return `NutritionResult` with `api_ref_id`, macro values, and `api_response_snapshot`.
- Implement cache layer: check `ApiCache` table before calling FatSecret; write result after a miss (TTL from `NUTRITION_CACHE_TTL_DAYS`).
- Implement provider factory reading `NUTRITION_PROVIDER` env var.

**Definition of Done**
- [ ] `FatSecretProvider.lookup({ food_name: "grilled chicken", quantity: 200, unit: "g" })` returns correct macro values (manual smoke test with real credentials).
- [ ] Unit tests with mocked HTTP cover:
  - Cache hit → FatSecret API is never called.
  - Cache miss → FatSecret API called, result written to cache.
  - FatSecret unavailable → `NutritionAPIError` thrown.
  - Food not found → `resolution_confidence: "low"` returned with zeroed macros.
  - Quantity scaling: 200g item with a per-100g serving returns doubled macro values.
- [ ] OAuth token is fetched once and reused until expiry.
- [ ] `normalizedQueryHash` is computed consistently for the same food name regardless of casing or extra whitespace.

---

## T-06 — `packages/messaging` — Messaging Adapter Abstraction & Telegram Implementation

**PRD refs:** FR-4, NFR-3
**Depends on:** T-03

**Scope**
- Define the `MessagingAdapter` interface (`packages/messaging/src/adapter.ts`) with `platform`, `registerWebhook()`, `sendMessage()`, and `onMessage()`.
- Implement `TelegramAdapter` using `telegraf`:
  - Registers a `POST /webhooks/telegram` route on the Express app.
  - Maps Telegram updates to `IncomingMessage`.
  - `sendMessage()` calls Telegram Bot API `sendMessage` method.
  - Verifies Telegram webhook secret token on every incoming request.
- Implement adapter factory reading `MESSAGING_PLATFORMS` env var.

**Definition of Done**
- [ ] `TelegramAdapter` registers the webhook route on the Express app without errors.
- [ ] A Telegram message sent to the bot triggers the `onMessage` handler with correctly shaped `IncomingMessage` (verified via integration test or manual test with a real bot token).
- [ ] `sendMessage()` delivers a text reply to the correct Telegram chat (manual smoke test).
- [ ] Requests without a valid `X-Telegram-Bot-Api-Secret-Token` header are rejected with HTTP 401.
- [ ] Unit tests cover `IncomingMessage` mapping from a raw Telegram update fixture.

---

## T-07 — `apps/api` — Express Server Bootstrap

**PRD refs:** foundation for all API-dependent FRs
**Depends on:** T-02, T-03

**Scope**
- Create the Express server entry point (`apps/api/src/index.ts`).
- Add global middleware: JSON body parser, request logger, `authenticateJWT` middleware.
- Mount router stubs for all routes defined in `tdd.md §8` (routes return `501 Not Implemented` until implemented).
- Initialize BullMQ connection to Redis.
- Wire provider factories (LLM, nutrition, messaging) from env vars.
- Add central error handler middleware (returns structured `{ error, message }` JSON).
- Add a `GET /health` endpoint returning `{ status: "ok" }`.

**Definition of Done**
- [ ] `pnpm --filter @diet-ai/api dev` starts without errors.
- [ ] `GET /health` returns `200 { status: "ok" }`.
- [ ] All route stubs are reachable and return `501`.
- [ ] A request to a protected route without a JWT returns `401`.
- [ ] An unhandled error thrown inside a route returns `500` with a JSON body (no stack trace in the response).
- [ ] BullMQ connects to Redis without errors on startup.

---

## T-08 — Auth — Registration, Login & JWT

**PRD refs:** FR-1, NFR-7
**Depends on:** T-02, T-07

**Scope**
- Implement `POST /api/v1/auth/register`: create `User` record, hash password with `bcrypt`, return JWT.
- Implement `POST /api/v1/auth/login`: verify credentials, return JWT.
- Implement `GET /api/v1/users/me`: return current user profile from JWT `sub`.
- Implement `PATCH /api/v1/users/me`: update profile fields (age, sex, height, weight, activity level, daily_calorie_goal).
- Store weight changes in `UserWeightHistory` when weight is updated (FR-12a).
- `authenticateJWT` middleware reads `Authorization: Bearer <token>` and attaches `req.user`.

**Definition of Done**
- [ ] `POST /register` creates a `User` row; password is stored as a bcrypt hash (never plaintext).
- [ ] `POST /login` returns a valid JWT for correct credentials and `401` for wrong credentials.
- [ ] `GET /users/me` returns the user profile when a valid JWT is provided.
- [ ] `PATCH /users/me` updates profile fields and writes a `UserWeightHistory` row when `weight_kg` changes.
- [ ] Unit tests cover: duplicate email on register → `409`, missing required fields → `400`, invalid JWT → `401`.

---

## T-09 — Auth — Magic Link & Platform Linking

**PRD refs:** FR-2, FR-2a, FR-3, FR-3a
**Depends on:** T-08

**Scope**
- Implement `POST /api/v1/auth/magic-link/generate`: create a `MagicLinkToken` (15-min expiry, single-use), return token + deep link URL.
- Implement `GET /api/v1/auth/magic-link/verify?token=`: validate token (not expired, not used), set `used_at`, create `UserIdentity` row linking `userId` + `platform` + `platformUserId`.
- Handle the Telegram `/start <token>` flow in `TelegramAdapter`: call verify endpoint internally, reply with success/failure message.

**Definition of Done**
- [ ] `POST /magic-link/generate` returns a token and a valid Telegram deep link URL.
- [ ] `GET /magic-link/verify` with a valid token creates a `UserIdentity` row and marks the token as used.
- [ ] A second call to verify with the same token returns `400`.
- [ ] A call to verify with an expired token returns `400`.
- [ ] After linking, sending a Telegram message as that user resolves to the correct `userId` via `UserIdentity` lookup.
- [ ] Unit tests cover: expired token, already-used token, unknown token — all return `400` with a descriptive message.

---

## T-10 — Core Pipeline — Message Processing Worker

**PRD refs:** FR-4, FR-5, FR-6, FR-6a, FR-7, FR-11, FR-11a, NFR-1, NFR-1a
**Depends on:** T-04, T-05, T-06, T-07, T-09

**Scope**
- Implement the `message-process` BullMQ worker (`apps/api/src/workers/messageProcessor.ts`).
- On message receipt from any `MessagingAdapter`: look up `userId` from `UserIdentity`; enqueue a `message-process` job.
- Worker flow (from `tdd.md §7.1`):
  1. Create `Log` record (`processing_status: "processing"`).
  2. Call `resolveParsedResult()` (clarification logic from `tdd.md §5.6`).
  3. If intent is not `log_meal`, route to appropriate handler and return early.
  4. For each item call `NutritionProvider.lookup()`.
  5. Create `Meal` + `MealItem` records with aggregated totals and provenance fields.
  6. Update `Log`: `processing_status: "success"`, `llm_output`, `latency_ms`.
  7. Reply to user via `MessagingAdapter`.
- On any error: update `Log` with `processing_status: "failed"`, `error_code`, `error_message`; send error reply.
- BullMQ retry: 2 retries with exponential backoff for network errors.

**Definition of Done**
- [ ] Sending "I had 200g grilled chicken and a banana for lunch" via Telegram results in:
  - A `Log` record with `raw_text`, `llm_output`, `processing_status: "success"`, and `latency_ms` populated.
  - A `Meal` record with `occasion: "lunch"` and correct aggregated `total_calories`, `total_protein_g`, `total_carbs_g`, `total_fat_g`.
  - Two `MealItem` records, each with `nutrition_api`, `api_ref_id`, and macro values.
  - A reply in Telegram summarising the logged meal and total calories.
- [ ] A message from an unlinked Telegram account replies with instructions to link the account; no `Log` is created.
- [ ] A nutrition API failure sets `Log.processing_status: "failed"` and sends an error reply; no `Meal` is created.
- [ ] Integration test covers the full happy path with mocked LLM and FatSecret HTTP calls.

---

## T-11 — Clarification Flow

**PRD refs:** FR-6, FR-6a
**Depends on:** T-10

**Scope**
- Implement `resolveParsedResult()` as specified in `tdd.md §5.6`.
- Redis key `clarification:<userId>` with 5-minute TTL.
- On clarification needed: store Redis state, update `Log.clarification_prompt`, send question, stop.
- On clarification response: re-parse with combined context, delete Redis key, update `Log.clarification_response`.
- Fallback: if still ambiguous after second parse, proceed with best-guess items and log `clarification_unresolved` warning.
- Abandoned clarification (TTL expired): next message treated as new log; pending log updated to `processing_status: "abandoned"`.

**Definition of Done**
- [ ] Sending "I had a bowl of cereal" triggers a single clarifying question and no `Meal` is created yet.
- [ ] Replying with "Cheerios, about 1 cup" results in a `Meal` being created with `Log.clarification_prompt` and `Log.clarification_response` both populated.
- [ ] Sending a second ambiguous reply still creates a `Meal` using best-guess items (fallback path).
- [ ] If no reply is sent within 5 minutes, the next message is treated as a fresh log and the abandoned log has `processing_status: "abandoned"`.
- [ ] Unit tests cover all four branches: no pending state, clarification triggered, clarification resolved, fallback path.

---

## T-12 — Chat-Based Editing

**PRD refs:** FR-13, FR-14, FR-14a
**Depends on:** T-10

**Scope**
- In the worker, handle `intent: "edit_meal"` by routing to `MealService.applyEditInstruction()`.
- `MealService.applyEditInstruction()`:
  - Resolves target `Meal` from `(userId, occasion, target_date)` or `target_meal_id`.
  - For each operation: applies `remove_item`, `update_quantity`, or `add_item` to `MealItem` records.
  - For `add_item`: calls `NutritionProvider.lookup()` for the new item.
  - Recalculates and persists `Meal` totals after all operations.
  - Writes an `EditHistory` record per operation (old value, new value, `source_log_id`).
- Reply to user with the updated meal summary.

**Definition of Done**
- [ ] "Remove the toast from my breakfast today" removes the matching `MealItem`, recalculates `Meal` totals, writes an `EditHistory` record, and replies with the updated summary.
- [ ] "Change my lunch yesterday — I only ate half the pasta" updates the item quantity, recalculates totals, and writes `EditHistory`.
- [ ] "Add an egg to my breakfast" calls `NutritionProvider.lookup()` for "egg", creates a new `MealItem`, recalculates totals, and writes `EditHistory`.
- [ ] `EditHistory.old_value` and `EditHistory.new_value` contain the correct before/after JSON snapshots.
- [ ] Editing a meal that does not exist replies with a clear "meal not found" message; no DB changes are made.
- [ ] Integration test covers remove, update, and add operations end-to-end with mocked LLM and FatSecret.

---

## T-13 — On-Demand Chat Summary

**PRD refs:** FR-16, FR-17
**Depends on:** T-10

**Scope**
- In the worker, handle `intent: "summary"` by routing to `MealService.getDailySummary()`.
- `MealService.getDailySummary(userId, date)`: aggregate `total_calories`, `total_protein_g`, `total_carbs_g`, `total_fat_g` across all `Meal` records for that day.
- Fetch `User.daily_calorie_goal`.
- Format reply: `"Today: 1,800 / 2,200 kcal | P: 120g | C: 180g | F: 60g"`.
- Resolve relative date expressions ("today", "yesterday") using message timestamp.

**Definition of Done**
- [ ] "Show today's summary" returns the correct aggregated totals and goal comparison for that day.
- [ ] "How many calories did I eat yesterday?" returns totals for the previous day.
- [ ] A day with no logs returns "No meals logged for [date]."
- [ ] The system never sends a summary unless the user explicitly requests one (FR-17).
- [ ] Unit tests cover: day with meals, day with no meals, goal not set (goal shown as "—").

---

## T-14 — REST API — Meals Endpoints

**PRD refs:** FR-14, FR-15, FR-20
**Depends on:** T-08, T-10

**Scope**
- Implement all meal endpoints from `tdd.md §8`:
  - `GET /api/v1/meals?date=YYYY-MM-DD` — list meals for a date.
  - `GET /api/v1/meals/:mealId` — meal detail with all items.
  - `PATCH /api/v1/meals/:mealId/items/:itemId` — update item (quantity, unit); recalculate meal totals; write `EditHistory`.
  - `DELETE /api/v1/meals/:mealId/items/:itemId` — remove item; recalculate totals; write `EditHistory`.
  - `DELETE /api/v1/meals/:mealId` — delete entire meal; write `EditHistory`.
- All endpoints require a valid JWT; users can only access their own meals.

**Definition of Done**
- [ ] `GET /meals?date=2026-03-14` returns all meals for that date for the authenticated user.
- [ ] `PATCH /meals/:mealId/items/:itemId` updates the item and recalculates `Meal` totals atomically (single DB transaction).
- [ ] `DELETE /meals/:mealId/items/:itemId` removes the item and recalculates totals.
- [ ] Every mutating endpoint writes an `EditHistory` record with correct old/new values.
- [ ] Requesting another user's meal returns `404` (not `403` — do not leak existence).
- [ ] Unit tests cover: item not found → `404`, invalid quantity (negative) → `400`, unauthenticated → `401`.

---

## T-15 — REST API — Logs Endpoint

**PRD refs:** FR-12, FR-11
**Depends on:** T-08, T-10

**Scope**
- Implement `GET /api/v1/logs?from=&to=` — return raw log records for the authenticated user within a date range.
- Include `llm_output`, `processing_status`, `error_code`, `clarification_prompt`, `clarification_response`, `latency_ms`.
- Default range if not specified: last 7 days.
- Cap maximum range at 31 days.

**Definition of Done**
- [ ] `GET /logs?from=2026-03-01&to=2026-03-14` returns only logs for the authenticated user within that range.
- [ ] Response includes all audit/debug fields per log record.
- [ ] Range exceeding 31 days returns `400`.
- [ ] Unauthenticated request returns `401`.

---

## T-16 — Web App — Auth Pages (Register & Login)

**PRD refs:** FR-1, FR-18
**Depends on:** T-08

**Scope**
- Build `/register` page: form with email, password, age, sex, height, weight, activity level, daily calorie goal.
- Build `/` (login) page: email + password form.
- On success, store JWT in an HTTP-only cookie.
- Redirect to `/dashboard` after login/register.
- Form validation with `react-hook-form` + Zod schemas from `packages/shared`.

**Definition of Done**
- [ ] A new user can register via the form; a `User` row is created in the DB.
- [ ] A registered user can log in and is redirected to `/dashboard`.
- [ ] Form shows field-level validation errors for missing or invalid inputs before submitting.
- [ ] JWT is stored in an HTTP-only cookie (not accessible via `document.cookie` in the browser).
- [ ] Attempting to access `/dashboard` without a valid cookie redirects to `/`.

---

## T-17 — Web App — Settings Page (Profile & Platform Linking)

**PRD refs:** FR-18, FR-2, FR-3
**Depends on:** T-09, T-16

**Scope**
- Build `/settings` page with:
  - Profile edit form (age, height, weight, activity level, daily calorie goal).
  - "Connect Telegram" button: calls `POST /api/v1/auth/magic-link/generate`, opens the returned deep link URL.
  - Displays currently linked platforms from `UserIdentity` records.

**Definition of Done**
- [ ] User can update profile fields; changes persist to the DB.
- [ ] Updating weight creates a `UserWeightHistory` record.
- [ ] Clicking "Connect Telegram" generates a magic link and opens the correct Telegram deep link.
- [ ] After linking, the settings page shows "Telegram: connected".

---

## T-18 — Web App — Dashboard

**PRD refs:** FR-19
**Depends on:** T-14, T-16

**Scope**
- Build `/dashboard` page:
  - Daily calorie summary: calories consumed today vs. goal.
  - Macro breakdown for today (protein, carbs, fat).
  - Weekly bar chart of daily calorie intake vs. goal (using `recharts`).
- Data fetched server-side via `GET /api/v1/meals?date=`.

**Definition of Done**
- [ ] Dashboard shows today's total calories and goal comparison.
- [ ] Macro totals for today are displayed.
- [ ] Weekly chart renders correctly with at least one day of data.
- [ ] A day with no meals shows 0 kcal (not an error or blank).
- [ ] Page loads in under 2 seconds for a standard data set (NFR-2).

---

## T-19 — Web App — History & Log Management

**PRD refs:** FR-12, FR-15, FR-20
**Depends on:** T-14, T-15, T-16

**Scope**
- Build `/history` page:
  - Date picker to filter meals by day.
  - List of meals for the selected date, each showing occasion, time, and total calories.
- Build `/history/[mealId]` page:
  - Meal detail: list of items with food name, quantity, unit, and per-item macros.
  - Edit item form (quantity, unit) — calls `PATCH /meals/:mealId/items/:itemId`.
  - Delete item button — calls `DELETE /meals/:mealId/items/:itemId`.
  - Delete meal button — calls `DELETE /meals/:mealId`.
  - After any mutation, meal totals are recalculated and the UI reflects the updated values.

**Definition of Done**
- [ ] User can navigate to `/history`, select a date, and see all meals for that day.
- [ ] Clicking a meal opens the detail page with all items and macros.
- [ ] Editing an item quantity updates the displayed macros immediately after save.
- [ ] Deleting an item removes it from the list and updates meal totals.
- [ ] Deleting a meal redirects back to `/history` and the meal no longer appears.
- [ ] All mutations write `EditHistory` records (verified in DB).

---

## T-20 — End-to-End Acceptance Test Pass

**PRD refs:** §9 Acceptance Criteria
**Depends on:** T-01 through T-19

**Scope**
- Manually walk through all acceptance criteria from `prd.md §9`.
- Verify NFR-1 (chat response ≤ 5s) by checking `Log.latency_ms` for a sample of messages.
- Verify debuggability: every chat-created meal has a `source_log_id`; every edit has an `EditHistory` record.

**Definition of Done**
- [ ] New user signs up via web, links Telegram via magic link, and logs a meal via Telegram — all without errors.
- [ ] Meal is visible on the web dashboard immediately after logging.
- [ ] "Show today's summary" in Telegram returns correct totals.
- [ ] Chat edit command updates the meal; change is visible on the web.
- [ ] Web edit updates the meal; `EditHistory` record exists.
- [ ] `Log.latency_ms` is under 5,000ms for at least 3 sample messages.
- [ ] `pnpm test` passes with ≥ 80% coverage on `packages/*` and `apps/api/src/services/`.
