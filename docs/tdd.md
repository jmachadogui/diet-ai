# Technical Design Document (TDD)
**Project:** Natural Language Calorie Tracker (MVP)
**Date:** 2026-03-14
**Status:** Draft

**Related documents:**
- `prd.md` — Product Requirements Document
- `calorie_tracker_erd.md` — Entity-Relationship Diagram

---

## Table of Contents

1. [Overview](#1-overview)
2. [Repository Structure](#2-repository-structure)
3. [Architecture Overview](#3-architecture-overview)
4. [Package Descriptions](#4-package-descriptions)
5. [Abstraction Layers](#5-abstraction-layers)
   - 5.1 [Messaging Abstraction](#51-messaging-abstraction)
   - 5.2 [LLM Abstraction](#52-llm-abstraction)
   - 5.3 [Nutrition API Abstraction](#53-nutrition-api-abstraction)
6. [Data Layer](#6-data-layer)
   - 6.1 [Prisma Schema Summary](#61-prisma-schema-summary)
   - 6.2 [API Cache Strategy](#62-api-cache-strategy)
7. [Core Processing Pipeline](#7-core-processing-pipeline)
   - 7.1 [Meal Logging Flow](#71-meal-logging-flow)
   - 7.2 [Edit Flow](#72-edit-flow)
   - 7.3 [Summary Flow](#73-summary-flow)
8. [API Design (Express)](#8-api-design-express)
9. [Job Queue](#9-job-queue)
10. [Authentication & Magic Link](#10-authentication--magic-link)
11. [Web Application (Next.js)](#11-web-application-nextjs)
12. [Error Handling Strategy](#12-error-handling-strategy)
13. [Testing Strategy](#13-testing-strategy)
14. [Environment & Local Development](#14-environment--local-development)
15. [Key Dependencies](#15-key-dependencies)
16. [Open Decisions](#16-open-decisions)

---

## 1. Overview

The system is a chat-first calorie tracker. Users log meals in natural language via messaging platforms (Telegram at MVP). A backend pipeline parses the message using an LLM, resolves nutritional data from a nutrition API, and stores structured results. A web portal handles enrollment, goal setting, and history review.

**Core design principles:**
- **Messaging-agnostic:** all chat platform logic sits behind a `MessagingAdapter` interface. Telegram is the first implementation; WhatsApp and Discord can be added without touching core logic.
- **LLM-agnostic:** all LLM calls go through an `LLMProvider` interface. AbacusAI RouteLLM is the default implementation; any other OpenAI-compatible provider can be swapped by changing configuration.
- **Nutrition API-agnostic:** all nutrition lookups go through a `NutritionProvider` interface. FatSecret is the first implementation.
- **TypeScript throughout:** shared Zod schemas enforce type safety across packages.
- **Monorepo:** all packages live in one repository managed with `pnpm workspaces`.

---

## 2. Repository Structure

```
diet-ai/
├── package.json                  # root workspace config
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .env.example
│
├── packages/
│   ├── shared/                   # shared types, Zod schemas, utilities
│   ├── db/                       # Prisma schema, client, migrations
│   ├── llm/                      # LLM abstraction + provider implementations
│   ├── nutrition/                # Nutrition API abstraction + provider implementations
│   └── messaging/                # Messaging abstraction + platform adapters
│
├── apps/
│   ├── api/                      # Express backend (REST API + webhook endpoint + bot runner)
│   └── web/                      # Next.js web frontend
│
└── infra/
    └── docker-compose.yml        # PostgreSQL + Redis for local development
```

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         apps/api (Express)                      │
│                                                                 │
│  ┌──────────────┐   ┌─────────────────┐   ┌─────────────────┐  │
│  │ REST API     │   │ Webhook Route   │   │ BullMQ Workers  │  │
│  │ /api/v1/*    │   │ /webhooks/:plat │   │ (message-proc.) │  │
│  └──────┬───────┘   └────────┬────────┘   └────────┬────────┘  │
│         │                    │                      │           │
│         └────────────────────┴──────────────────────┘           │
│                              │                                  │
│                     ┌────────▼────────┐                         │
│                     │  Service Layer  │                         │
│                     │  - LogService   │                         │
│                     │  - MealService  │                         │
│                     │  - UserService  │                         │
│                     │  - AuthService  │                         │
│                     └────────┬────────┘                         │
└──────────────────────────────┼──────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
   ┌──────▼──────┐    ┌────────▼───────┐   ┌───────▼────────┐
   │  packages/  │    │  packages/llm  │   │ packages/      │
   │  db         │    │  LLMProvider   │   │ nutrition      │
   │  (Prisma)   │    │  interface     │   │ NutritionProv. │
   └──────┬──────┘    └────────┬───────┘   └───────┬────────┘
          │                    │                    │
          ▼                    ▼                    ▼
     PostgreSQL          AbacusAI RouteLLM        FatSecret
                         (configurable)        (configurable)


  packages/messaging
  MessagingAdapter interface
  └── TelegramAdapter (Telegraf)
  └── (future: WhatsAppAdapter, DiscordAdapter)
```

The messaging adapter receives incoming messages and enqueues a `message-process` job. A BullMQ worker picks up the job, runs the full pipeline (LLM parse → nutrition lookup → DB write), then calls `adapter.sendMessage()` to reply.

---

## 4. Package Descriptions

### `packages/shared`
- Zod schemas shared across all packages and apps.
- Core parsed meal schema (`MealParseResultSchema`).
- Common utility types (platform names, intent enum, meal occasion enum).
- No runtime dependencies beyond `zod`.

### `packages/db`
- Prisma schema and generated client.
- All database migrations live here.
- Exports a singleton `prisma` client consumed by `apps/api`.
- Exposes typed repository helpers (thin wrappers over Prisma calls) to keep query logic out of service files.

### `packages/llm`
- `LLMProvider` interface (see §5.2).
- `AbacusAIProvider` implementation (default).
- Additional provider implementations (e.g. `OpenAIProvider`) can be added following the same interface.
- Provider factory function: reads `LLM_PROVIDER` env var and returns the correct implementation.

### `packages/nutrition`
- `NutritionProvider` interface (see §5.3).
- `FatSecretProvider` implementation.
- Provider factory function: reads `NUTRITION_PROVIDER` env var.
- Normalization logic: converts FatSecret per-serving data to per-gram, then scales to user-specified quantity.

### `packages/messaging`
- `MessagingAdapter` interface (see §5.1).
- `TelegramAdapter` implementation using Telegraf.
- Adapter factory: reads `MESSAGING_PLATFORM` env var (comma-separated list for future multi-platform).
- Each adapter registers its webhook route on the Express app.

### `apps/api`
- Express server entry point.
- Mounts REST routes under `/api/v1/`.
- Mounts webhook routes for each active messaging adapter.
- Initializes BullMQ workers.
- Wires providers via factory functions from packages.

### `apps/web`
- Next.js app (App Router).
- Consumes the REST API from `apps/api`.
- Shares Zod schemas from `packages/shared` for form validation.

---

## 5. Abstraction Layers

### 5.1 Messaging Abstraction

**Location:** `packages/messaging/src/adapter.ts`

```typescript
export interface IncomingMessage {
  platformMessageId: string;
  platformUserId: string;
  platform: Platform;
  text: string;
  timestamp: Date;
}

export interface OutgoingMessage {
  platformUserId: string;
  platform: Platform;
  text: string;
}

export interface MessagingAdapter {
  platform: Platform;
  registerWebhook(app: Express): void;
  sendMessage(msg: OutgoingMessage): Promise<void>;
  onMessage(handler: (msg: IncomingMessage) => Promise<void>): void;
}
```

`TelegramAdapter` implements this interface. When a Telegram update arrives, it maps it to `IncomingMessage` and calls the registered `onMessage` handler. The handler (in `apps/api`) enqueues the message as a BullMQ job.

Adding WhatsApp or Discord means adding a new class that implements `MessagingAdapter` — core pipeline code is untouched.

### 5.2 LLM Abstraction

**Location:** `packages/llm/src/provider.ts`

```typescript
export interface LLMParseResult {
  intent: "log_meal" | "edit_meal" | "summary" | "other";
  needs_clarification: boolean;
  clarification_question: string | null;
  meal_occasion: "breakfast" | "lunch" | "dinner" | "snack" | "unknown";
  items: Array<{
    food_name: string;
    quantity: number;
    unit: string;
  }>;
}

export interface LLMProvider {
  parseMessage(rawText: string, context?: string): Promise<LLMParseResult>;
}
```

`LLMParseResult` is validated at the provider level with Zod before being returned. If the LLM returns malformed JSON or fails schema validation, the provider throws a typed `LLMParseError`.

**`AbacusAIProvider` implementation details:**

AbacusAI exposes a RouteLLM API that is fully OpenAI-compatible. The `AbacusAIProvider` uses the `openai` npm package pointed at the AbacusAI base URL:

```typescript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://routellm.abacus.ai/v1",
  apiKey: process.env.ABACUSAI_API_KEY,
});
```

- **Model:** `"route-llm"` (automatic routing to best available model) or a specific model name via `ABACUSAI_MODEL` env var.
- **Structured output:** uses `response_format: { type: "json_object" }` combined with a system prompt that enforces the schema. The raw string response is parsed and validated with Zod before being returned.
- **Auth:** Bearer API key via `ABACUSAI_API_KEY` env var.
- **Base URL:** `https://routellm.abacus.ai/v1` for self-serve accounts.

Because the interface uses the standard OpenAI SDK with a custom `baseURL`, swapping to a different OpenAI-compatible provider (e.g. direct OpenAI, Gemini via OpenAI compat layer) requires only a new `baseURL` + `apiKey` — no logic changes.

The system prompt instructs the LLM to:
- Always return valid JSON matching the schema.
- Set `needs_clarification: true` and populate `clarification_question` when ambiguity is detected.
- Default `meal_occasion` to `"unknown"` when not inferable.
- Respect weight-based quantities (e.g., "200g") as-is.

### 5.3 Nutrition API Abstraction

**Location:** `packages/nutrition/src/provider.ts`

```typescript
export interface NutritionQuery {
  food_name: string;
  quantity: number;
  unit: string;
}

export interface NutritionResult {
  food_name: string;
  api_ref_id: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  api_response_snapshot: Record<string, unknown>;
  resolution_confidence: "high" | "medium" | "low";
}

export interface NutritionProvider {
  lookup(query: NutritionQuery): Promise<NutritionResult>;
  vendorName: string;
}
```

`FatSecretProvider` flow per query:
1. Check `API_CACHE` table (by normalized query hash). Return cached result if valid (not expired).
2. Call `foods.search` with `food_name`.
3. Select best match (first result, or apply basic scoring).
4. Call `food.get` with the matched `food_id`.
5. Normalize: extract per-gram macros from serving data, scale by `quantity` and `unit`.
6. Write result to `API_CACHE`.
7. Return `NutritionResult`.

FatSecret OAuth 2.0 token is obtained via Client Credentials flow and cached in-memory with expiry.

---

### 5.4 LLM Model Configuration

**Default model:** `claude-sonnet-4-5`

**Rationale:** Claude Sonnet 4.5 produces reliable structured JSON, respects system prompt constraints (critical for enforcing single-question clarification), and is cost-effective relative to Opus-tier models. It is available on AbacusAI RouteLLM under the name `claude-sonnet-4-5`.

**Override:** Configurable via env var. Setting `ABACUSAI_MODEL=route-llm` delegates selection to AbacusAI's automatic router.

**Per-task model assignment** (`packages/llm/src/config.ts`):

```typescript
export const LLM_MODELS = {
  parse: process.env.ABACUSAI_PARSE_MODEL ?? "claude-sonnet-4-5",
  edit:  process.env.ABACUSAI_EDIT_MODEL  ?? "claude-sonnet-4-5",
} as const;
```

Keeping parse and edit model refs separate allows tuning each independently without touching logic.

---

### 5.5 System Prompts

System prompts live in `packages/llm/src/prompts/`. They are plain TypeScript string constants. Dynamic values (e.g. current date, meals context) are injected via a thin wrapper function before each API call.

#### 5.5.1 Parsing Prompt

**File:** `packages/llm/src/prompts/parse.ts`

**Purpose:** Extract structured meal data from a free-form user message.

```
SYSTEM PROMPT — MEAL PARSER
────────────────────────────────────────────────────────────────

You are a meal logging assistant. Your only job is to extract
structured data from a user's natural language food message and
return a single, valid JSON object. You must NEVER return plain
text, explanations, or markdown. Return raw JSON only.

TODAY'S DATE: {{TODAY_ISO}}
USER'S LOCAL TIME: {{USER_TIME}}  (use to infer meal occasion
when not explicit)

────────────────────────────────────────────────────────────────
OUTPUT SCHEMA (always return every field, no extra fields):

{
  "intent": "log_meal" | "edit_meal" | "summary" | "other",
  "needs_clarification": boolean,
  "clarification_question": string | null,
  "meal_occasion": "breakfast" | "lunch" | "dinner" | "snack" | "unknown",
  "consumed_at": ISO8601 datetime string | null,
  "items": [
    {
      "food_name": string,
      "quantity": number,
      "unit": "g" | "ml" | "oz" | "cup" | "tbsp" | "tsp" |
               "slice" | "piece" | "serving" | "unit"
    }
  ]
}

────────────────────────────────────────────────────────────────
RULES:

1. INTENT DETECTION
   - "log_meal"  → user is describing food they ate or are eating.
   - "edit_meal" → user wants to change a previously logged meal.
   - "summary"   → user asks for totals, history, or progress.
   - "other"     → anything else (greetings, questions, etc.).
   - Only populate "items" when intent is "log_meal".

2. QUANTITIES & UNITS
   - If the user specifies a weight (e.g. "200g", "3oz"), use it
     exactly. Set unit to "g" or "oz". This always takes priority.
   - If the user gives a count (e.g. "2 slices", "1 cup"), use
     that count as quantity and the appropriate unit.
   - If no quantity is given and the item is unambiguous (e.g.
     "a banana"), set quantity to 1 and unit to "unit". Do NOT
     ask for clarification just for a missing quantity.

3. CLARIFICATION (one question maximum)
   - Set needs_clarification to true ONLY when the ambiguity
     would meaningfully affect calories — e.g. the type of food
     is unclear ("cereal" without specifying kind and size), or
     preparation method changes macros significantly (fried vs
     grilled).
   - When needs_clarification is true:
       - Write exactly ONE specific, concise question in
         clarification_question.
       - Still populate "items" with your best guess so the
         system has a fallback if the user does not reply.
       - Do NOT ask about quantity alone — default to 1 serving.
   - When needs_clarification is false, clarification_question
     must be null.
   - NEVER ask more than one question. If multiple things are
     ambiguous, ask about the one that most affects calories.

4. MEAL OCCASION
   - Infer from explicit mention ("for breakfast", "at lunch").
   - If not explicit, infer from USER'S LOCAL TIME:
       05:00–10:59 → breakfast
       11:00–14:59 → lunch
       15:00–17:59 → snack
       18:00–21:59 → dinner
       22:00–04:59 → snack
   - If time is unavailable, use "unknown".

5. CONSUMED_AT
   - If the user specifies a time or relative expression
     ("yesterday at 1pm", "this morning"), resolve it to an
     ISO8601 datetime using TODAY_ISO as the anchor.
   - If not specified, set consumed_at to null. The backend will
     use the message timestamp.

6. MULTIPLE ITEMS
   - A single message can contain multiple foods. Return all of
     them in "items". Do not merge them into one entry.

7. NON-FOOD MESSAGES
   - If intent is not "log_meal", return an empty "items" array
     and null for clarification_question.

────────────────────────────────────────────────────────────────
```

**Injection function:**

```typescript
export function buildParseSystemPrompt(todayISO: string, userTime: string): string {
  return PARSE_SYSTEM_PROMPT
    .replace("{{TODAY_ISO}}", todayISO)
    .replace("{{USER_TIME}}", userTime);
}
```

---

#### 5.5.2 Editing Prompt

**File:** `packages/llm/src/prompts/edit.ts`

**Purpose:** Extract a structured edit instruction from a user's natural language correction message.

```
SYSTEM PROMPT — MEAL EDITOR
────────────────────────────────────────────────────────────────

You are a meal log editor. The user wants to correct a previously
logged meal. Extract a structured edit instruction and return a
single, valid JSON object. Return raw JSON only — no plain text,
no explanations, no markdown.

TODAY'S DATE: {{TODAY_ISO}}

EXISTING MEALS CONTEXT:
{{MEALS_CONTEXT}}
(A JSON array of the user's recent meals, each with:
 id, occasion, consumed_at, items[{id, food_name, quantity, unit}])

────────────────────────────────────────────────────────────────
OUTPUT SCHEMA:

{
  "intent": "edit_meal",
  "target_meal_id": string | null,
  "target_occasion": "breakfast" | "lunch" | "dinner" | "snack" | null,
  "target_date": "today" | "yesterday" | ISO8601 date | null,
  "operations": [
    {
      "type": "remove_item" | "update_quantity" | "add_item",
      "item_ref": string | null,
      "new_quantity": number | null,
      "new_unit": string | null,
      "food_name": string | null
    }
  ],
  "needs_clarification": boolean,
  "clarification_question": string | null
}

────────────────────────────────────────────────────────────────
RULES:

1. IDENTIFYING THE TARGET MEAL
   - Match using target_occasion + target_date against the
     MEALS CONTEXT provided.
   - If context provides an unambiguous match, also populate
     target_meal_id.
   - If the target meal is ambiguous (e.g. two lunches on the
     same day), set needs_clarification to true with one
     specific question.

2. OPERATIONS
   - "remove_item": item_ref = food name to remove (lowercase,
     matching MEALS CONTEXT). new_quantity, new_unit, food_name
     are null.
   - "update_quantity": item_ref = food name, new_quantity and
     new_unit = the corrected values.
   - "add_item": food_name = new item name, new_quantity and
     new_unit = the amount. item_ref is null.
   - A single message may produce multiple operations (e.g.
     "remove the toast and add an egg").

3. ITEM_REF MATCHING
   - Use the exact food_name from MEALS CONTEXT as item_ref so
     the backend can match precisely. Normalize to lowercase.

4. CLARIFICATION
   - Same single-question rule as the parser. Only ask if the
     ambiguity prevents identifying the correct meal or item.

5. DATES
   - "today" and "yesterday" are valid shorthands.
   - Resolve all other relative expressions to ISO8601 date
     using TODAY_ISO as the anchor.

────────────────────────────────────────────────────────────────
```

**Injection function:**

```typescript
export function buildEditSystemPrompt(
  todayISO: string,
  mealsContext: MealContext[]
): string {
  return EDIT_SYSTEM_PROMPT
    .replace("{{TODAY_ISO}}", todayISO)
    .replace("{{MEALS_CONTEXT}}", JSON.stringify(mealsContext, null, 2));
}
```

`MealContext` is a lightweight projection of the user's last 7 days of meals, capped at 20 entries to stay within context limits. It is fetched from the DB before calling the LLM.

---

### 5.6 Clarification Logic (FR-6)

**Constraint:** The system asks at most **one** clarifying question per message. If the user's reply is still ambiguous, the system falls back to the best-guess `items` already populated by the LLM on the first parse.

#### State storage

Clarification state is stored in Redis — it is ephemeral and session-scoped, so the DB is not appropriate:

```
Key:   clarification:<userId>
Value: JSON {
         logId: string,        // LOGS.id of the pending log
         originalText: string, // the original user message
         question: string      // the question that was sent
       }
TTL:   300 seconds (5 minutes)
```

If the key expires before the user replies, the next message from that user is treated as a new independent log. The pending log is updated to `processing_status: "abandoned"`.

#### Flow

```
Incoming message
       │
       ▼
Check Redis: clarification:<userId>
       │
  ┌────┴─────────┐
exists          not exists
  │                  │
  ▼                  ▼
CLARIFICATION     FIRST PARSE
RESPONSE PATH     llmProvider.parseMessage(rawText)
  │                  │
  │             ┌────┴──────────────────┐
  │        needs_clarification: false   needs_clarification: true
  │             │                            │
  │             ▼                            ▼
  │        proceed to                  store Redis key (TTL 300s)
  │        nutrition lookup            update LOGS.clarification_prompt
  │                                    reply with clarification_question
  │                                    STOP — wait for next message
  │
  ▼
Re-parse with combined context:
  "<originalText>\n\nUser clarification: <replyText>"
       │
  ┌────┴──────────────────────┐
needs_clarification: false    needs_clarification: true (still ambiguous)
  │                                │
  ▼                                ▼
proceed to                    use best-guess items from first parse
nutrition lookup              proceed to nutrition lookup (fallback)
                              log warning: clarification_unresolved
       │
       ▼ (both paths merge here)
delete Redis key
update LOGS.clarification_response = replyText
proceed: nutrition lookup → meal write → reply to user
```

#### Implementation

**File:** `apps/api/src/workers/messageProcessor.ts`

```typescript
async function resolveParsedResult(
  job: MessageProcessJob,
  redis: Redis,
  llmProvider: LLMProvider,
  messagingAdapter: MessagingAdapter
): Promise<{ result: LLMParseResult; isFallback: boolean }> {
  const pendingKey = `clarification:${job.userId}`;
  const pending = await redis.get(pendingKey);

  if (pending) {
    const { logId, originalText } = JSON.parse(pending) as ClarificationState;
    const combined = `${originalText}\n\nUser clarification: ${job.rawText}`;
    const result = await llmProvider.parseMessage(combined);
    await redis.del(pendingKey);
    await logRepo.setClarificationResponse(logId, job.rawText);
    const isFallback = result.needs_clarification === true;
    return { result, isFallback };
  }

  const result = await llmProvider.parseMessage(job.rawText);

  if (result.needs_clarification && result.clarification_question) {
    const state: ClarificationState = {
      logId: job.logId,
      originalText: job.rawText,
      question: result.clarification_question,
    };
    await redis.set(pendingKey, JSON.stringify(state), "EX", 300);
    await logRepo.setClarificationPrompt(job.logId, result.clarification_question);
    await messagingAdapter.sendMessage({
      platformUserId: job.platformUserId,
      platform: job.platform,
      text: result.clarification_question,
    });
    return { result, isFallback: false };
  }

  return { result, isFallback: false };
}
```

After `resolveParsedResult()` returns, the caller checks `result.intent` and routes accordingly. When `isFallback` is true the caller logs a warning and continues with `result.items` unchanged.

---

## 6. Data Layer

### 6.1 Prisma Schema Summary

Prisma models map 1:1 to the ERD. Key field type notes:

| ERD type | Prisma type |
|---|---|
| `uuid` PK | `String @id @default(uuid())` |
| `jsonb` | `Json` |
| `text` | `String` |
| `timestamp` | `DateTime` |
| `float` | `Float` |

Notable Prisma model annotations:
- `USER_IDENTITIES`: composite unique on `(platform, platformUserId)`.
- `MAGIC_LINK_TOKENS`: unique on `token`; indexed on `(userId, platform)`.
- `API_CACHE`: unique on `normalizedQueryHash`; index on `expiresAt` for cache eviction queries.
- `LOGS`: index on `(userId, createdAt)` for history queries.
- `MEALS`: index on `(userId, consumedAt)` for daily summaries.

### 6.2 API Cache Strategy

- **Cache key:** SHA-256 of `lowercase(trim(food_name)) + "|" + normalized_unit`.
- **TTL:** 7 days (configurable via `NUTRITION_CACHE_TTL_DAYS` env var).
- **Read:** before every `NutritionProvider.lookup()` call, check cache. Cache hit bypasses both FatSecret API calls.
- **Write:** after a successful nutrition lookup, upsert the cache row.
- **Eviction:** no background job at MVP; stale entries are ignored on read (checked via `expiresAt < now()`).

---

## 7. Core Processing Pipeline

### 7.1 Meal Logging Flow

```
1. MessagingAdapter receives message
2. Enqueue job: { userId, rawText, platform, platformMessageId, timestamp }
3. Worker picks up job:
   a. Create LOGS record (status: "processing")
   b. Call LLMProvider.parseMessage(rawText)
      - If intent != "log_meal" → route to appropriate handler, update log status
      - If needs_clarification == true:
          i.  Reply with clarification_question via MessagingAdapter
          ii. Store clarification_prompt on LOGS record
          iii.Wait for next message (treated as clarification_response)
          iv. Re-run parseMessage with combined context
   c. For each item in LLMParseResult.items:
      - Call NutritionProvider.lookup(item)
   d. Create MEALS record with aggregated totals
   e. Create MEAL_ITEMS records with per-item nutrition + provenance
   f. Update LOGS record: status "success", llm_output, latency_ms
   g. Reply to user via MessagingAdapter with summary of logged meal
4. On any error:
   - Update LOGS record: status "failed", error_code, error_message
   - Reply to user with appropriate error message
```

### 7.2 Edit Flow

```
1. LLMProvider detects intent "edit_meal"
2. LLMProvider returns structured edit instruction:
   {
     intent: "edit_meal",
     target_occasion: "breakfast",
     target_date: "today",
     edit_operation: "remove_item" | "update_quantity" | "add_item",
     item_ref: "toast",
     new_quantity?: number,
     new_unit?: string
   }
3. MealService resolves target meal from (userId, occasion, date)
4. MealService applies edit operation to MEAL_ITEMS
5. MealService recalculates MEALS totals
6. Write EDIT_HISTORY record (old_value, new_value, source_log_id)
7. Reply with updated meal summary
```

### 7.3 Summary Flow

```
1. LLMProvider detects intent "summary"
2. MealService.getDailySummary(userId, date)
3. Aggregate total calories, protein, carbs, fat from MEALS for that day
4. Fetch user daily_calorie_goal from USERS
5. Format and reply: "Today: 1,800 / 2,200 kcal | P: 120g | C: 180g | F: 60g"
```

---

## 8. API Design (Express)

Base path: `/api/v1`

### Auth
| Method | Path | Description |
|---|---|---|
| `POST` | `/auth/register` | Create new user account |
| `POST` | `/auth/login` | Password login, returns JWT |
| `POST` | `/auth/magic-link/generate` | Generate magic link token for platform linking |
| `GET` | `/auth/magic-link/verify?token=` | Verify and consume magic link token |

### Users
| Method | Path | Description |
|---|---|---|
| `GET` | `/users/me` | Get current user profile |
| `PATCH` | `/users/me` | Update profile (height, weight, goal, etc.) |

### Meals
| Method | Path | Description |
|---|---|---|
| `GET` | `/meals?date=YYYY-MM-DD` | List meals for a given date |
| `GET` | `/meals/:mealId` | Get meal with all items |
| `PATCH` | `/meals/:mealId/items/:itemId` | Update a meal item (quantity, etc.) |
| `DELETE` | `/meals/:mealId/items/:itemId` | Remove a meal item |
| `DELETE` | `/meals/:mealId` | Delete entire meal |

### Logs (internal/debug)
| Method | Path | Description |
|---|---|---|
| `GET` | `/logs?from=&to=` | List raw logs for date range |

### Webhooks
| Method | Path | Description |
|---|---|---|
| `POST` | `/webhooks/telegram` | Telegram update endpoint (registered by TelegramAdapter) |

All protected routes require `Authorization: Bearer <jwt>` header. The webhook route is authenticated via platform-specific signature verification (Telegram secret token).

---

## 9. Job Queue

**Library:** BullMQ + Redis

### Queues

| Queue name | Description |
|---|---|
| `message-process` | One job per incoming chat message |

### Job payload (`message-process`)

```typescript
interface MessageProcessJob {
  userId: string;
  logId: string;
  rawText: string;
  platform: Platform;
  platformMessageId: string;
  messageTimestamp: Date;
  isClarificationResponse: boolean;
  originalLogId?: string;
}
```

### Worker behavior
- Concurrency: 5 (configurable via `QUEUE_CONCURRENCY` env var).
- Retry: 2 retries with exponential backoff on transient failures (network errors to LLM or nutrition API).
- On final failure: update `LOGS.processing_status` to `"failed"`, send error reply to user.

---

## 10. Authentication & Magic Link

### JWT
- Access token: 7-day expiry, signed with `JWT_SECRET` env var.
- Payload: `{ sub: userId, email }`.
- Middleware: `authenticateJWT` Express middleware applied to all `/api/v1/*` routes except auth endpoints and webhooks.

### Magic Link Flow

```
Web → POST /auth/magic-link/generate
  body: { platform: "telegram" }
  → creates MAGIC_LINK_TOKENS row (expires in 15 min, single-use)
  → returns { token, deep_link_url }

User clicks deep_link_url → opens Telegram bot with token as start param

TelegramAdapter sees /start <token>
  → POST /auth/magic-link/verify?token=<token>  (internal call from adapter)
  → verifies token is valid, not expired, not used
  → sets used_at, links USER_IDENTITIES row (userId + platform + platformUserId)
  → bot replies: "Your Telegram account is now linked."
```

---

## 11. Web Application (Next.js)

**Router:** App Router (Next.js 14+)

### Pages

| Route | Description |
|---|---|
| `/` | Landing / login |
| `/register` | Registration form |
| `/dashboard` | Daily summary + goal vs actual chart |
| `/history` | Date-filtered meal log list |
| `/history/[mealId]` | Meal detail + edit/delete items |
| `/settings` | Profile, goals, linked platforms |

### Data fetching
- Server Components fetch from `apps/api` using the user's JWT stored in an HTTP-only cookie.
- Client Components (forms, edits) call the API via `fetch` with the same cookie.

### Shared schemas
- Import Zod schemas from `packages/shared` for form validation (react-hook-form + zod resolver).

---

## 12. Error Handling Strategy

| Layer | Error type | Behavior |
|---|---|---|
| LLM provider | Malformed JSON / schema mismatch | Throw `LLMParseError`, worker retries once, then marks log failed |
| LLM provider | Rate limit / network | Throw `LLMNetworkError`, BullMQ retries with backoff |
| Nutrition provider | Food not found | Return low-confidence result with fallback estimate; log warning |
| Nutrition provider | API unavailable | Throw `NutritionAPIError`, BullMQ retries with backoff |
| Nutrition provider | Cache miss + API down | Return error to user: "Unable to fetch nutrition data. Try again later." |
| Express routes | Validation failure (Zod) | Return `400` with structured error body |
| Express routes | Auth failure | Return `401` |
| Express routes | Not found | Return `404` |
| Express routes | Unhandled | Central error handler middleware returns `500`, logs to console (stderr) |

All errors on log records persist `error_code` and `error_message` for observability (FR-10a).

---

## 13. Testing Strategy

**Framework:** Jest + `ts-jest`

### Unit tests (`*.test.ts` co-located with source)

| Target | What to test |
|---|---|
| `LLMProvider` implementations | Mock HTTP client; assert schema validation, error throwing on bad responses |
| `NutritionProvider` implementations | Mock HTTP client; assert normalization math (quantity scaling, unit conversion) |
| `MealService` | Mock Prisma; assert aggregation logic, edit operations, recalculation |
| `AuthService` | Mock Prisma; assert token generation, expiry logic, single-use enforcement |
| Cache logic | Assert cache hit/miss behavior, TTL expiry checks |

### Integration tests (`*.integration.test.ts` in `apps/api/src/__tests__/`)

- Spin up a test PostgreSQL instance (via `docker-compose` or `@testcontainers/postgresql`).
- Use a real Prisma client against the test DB.
- Mock only external HTTP calls (LLM API, FatSecret API) via `jest.mock` or `msw`.
- Test full pipeline: message in → DB records written → correct reply output.

### Key test scenarios

1. Free-text meal log → correct LOGS + MEALS + MEAL_ITEMS records created.
2. Ambiguous input → clarification question sent, clarification response processed.
3. Edit command → MEAL_ITEMS updated, EDIT_HISTORY written, totals recalculated.
4. Summary command → correct calorie total returned, goal comparison correct.
5. FatSecret unavailable → error status on log, error reply sent to user.
6. Magic link → token consumed, USER_IDENTITIES row created, duplicate use rejected.
7. Expired magic link → verify endpoint returns 400.

### Coverage target
- 80% line coverage on `packages/*` and `apps/api/src/services/`.

---

## 14. Environment & Local Development

### Prerequisites
- Node.js 20+
- pnpm 9+
- Docker (for PostgreSQL + Redis)

### Local setup

```bash
# 1. Start infrastructure
docker-compose -f infra/docker-compose.yml up -d

# 2. Install dependencies
pnpm install

# 3. Copy and fill env
cp .env.example .env

# 4. Run DB migrations
pnpm --filter @diet-ai/db migrate:dev

# 5. Start API (with watch)
pnpm --filter @diet-ai/api dev

# 6. Start web (with watch)
pnpm --filter @diet-ai/web dev
```

### `.env.example`

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dietai

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=changeme

# LLM
LLM_PROVIDER=abacusai
ABACUSAI_API_KEY=
ABACUSAI_BASE_URL=https://routellm.abacus.ai/v1
ABACUSAI_MODEL=route-llm

# Nutrition API
NUTRITION_PROVIDER=fatsecret
FATSECRET_CLIENT_ID=
FATSECRET_CLIENT_SECRET=

# Messaging
MESSAGING_PLATFORMS=telegram
TELEGRAM_BOT_TOKEN=
TELEGRAM_WEBHOOK_SECRET=

# Cache
NUTRITION_CACHE_TTL_DAYS=7

# Queue
QUEUE_CONCURRENCY=5
```

### `infra/docker-compose.yml`

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: dietai
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

---

## 15. Key Dependencies

### Root / shared
| Package | Purpose |
|---|---|
| `typescript` | Language |
| `zod` | Schema validation and type inference |
| `jest` + `ts-jest` | Testing |

### `apps/api`
| Package | Purpose |
|---|---|
| `express` | HTTP server |
| `bullmq` | Job queue |
| `ioredis` | Redis client (for BullMQ) |
| `jsonwebtoken` | JWT signing/verification |
| `bcrypt` | Password hashing |

### `packages/db`
| Package | Purpose |
|---|---|
| `@prisma/client` | Generated DB client |
| `prisma` | CLI for migrations and codegen |

### `packages/llm`
| Package | Purpose |
|---|---|
| `openai` | OpenAI-compatible SDK — used with AbacusAI RouteLLM base URL |

### `packages/nutrition`
| Package | Purpose |
|---|---|
| `axios` | HTTP client for FatSecret REST calls |

### `packages/messaging`
| Package | Purpose |
|---|---|
| `telegraf` | Telegram Bot API framework |

### `apps/web`
| Package | Purpose |
|---|---|
| `next` | Web framework |
| `react` + `react-dom` | UI |
| `react-hook-form` | Form state management |
| `recharts` | Calorie/goal charts |

---

## 16. Open Decisions

| # | Decision | Options | Notes |
|---|---|---|---|
| 1 | AbacusAI model selection | `route-llm` (auto-routing) vs specific model name | Default: `route-llm`; override via `ABACUSAI_MODEL` env var |
| 2 | Clarification session state | In-memory Map, Redis, DB flag on LOGS | MVP: Redis key `clarification:<userId>` with 5-min TTL |
| 3 | Nutrition cache eviction | Query-time TTL check only vs background cron | MVP: query-time only |
| 4 | FatSecret food match scoring | First result vs keyword scoring | Start with first result; improve if accuracy issues arise |
| 5 | Edit undo via chat | Supported or not | Not in MVP; EDIT_HISTORY table is ready for it |
| 6 | Deployment target | Render, Railway, Fly.io, Vercel+Railway split | To be decided when moving off local |
| 7 | Next.js API routes vs Express only | Thin Next.js BFF vs all traffic through Express | Recommended: all data through Express; Next.js only serves UI |
