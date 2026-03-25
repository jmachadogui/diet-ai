# T-04 — `packages/llm` — LLM Provider Abstraction & AbacusAI Implementation — Implementation Plan

**Task refs:** `tasks.md §T-04`
**Related docs:** `tdd.md §5.2`, `tdd.md §5.4`, `tdd.md §5.5`, `prd.md §FR-5`, `prd.md §FR-6`, `prd.md §FR-6a`, `prd.md §FR-7`
**Depends on:** T-03 (packages/shared Zod schemas — already completed)

---

## Overview

`packages/llm` provides the LLM abstraction layer. The core deliverables are:

1. `LLMProvider` interface (`provider.ts`)
2. `AbacusAIProvider` implementation using the `openai` SDK with a custom `baseURL`
3. System prompt files with injection helpers (`prompts/parse.ts`, `prompts/edit.ts`)
4. Typed `LLMParseError` for validation failures
5. Model config (`config.ts`)
6. Provider factory function (`factory.ts`)
7. Barrel export (`index.ts`)
8. Unit tests covering all DoD cases

The package already has its `package.json` (with `openai` and `@diet-ai/shared` deps) and a stub `src/index.ts`. All implementation goes into new files under `packages/llm/src/`.

---

## Step 1 — Define the `LLMProvider` interface and `LLMParseError`

**File:** `packages/llm/src/provider.ts`

The interface mirrors `tdd.md §5.2` exactly. `LLMParseResult` is **not** re-defined here — it is imported from `@diet-ai/shared` (`MealParseResult`). The same applies to `EditInstruction`.

```typescript
import type { MealParseResult, EditInstruction } from "@diet-ai/shared";

export type { MealParseResult, EditInstruction };

export interface LLMProvider {
  parseMessage(rawText: string, todayISO: string, userTime: string): Promise<MealParseResult>;
  editMessage(rawText: string, todayISO: string, mealsContext: MealContext[]): Promise<EditInstruction>;
}

export interface MealContext {
  id: string;
  occasion: string;
  consumed_at: string | null;
  items: Array<{ id: string; food_name: string; quantity: number; unit: string }>;
}

export class LLMParseError extends Error {
  constructor(
    message: string,
    public readonly raw: string
  ) {
    super(message);
    this.name = "LLMParseError";
  }
}
```

**Design notes:**
- `parseMessage` accepts `todayISO` and `userTime` so the caller (the BullMQ worker) can inject the current timestamp from the job payload — the provider must not call `new Date()` internally, keeping it deterministically testable.
- `editMessage` accepts `mealsContext` for the same reason — fetched by the caller before the LLM call.
- `LLMParseError` carries the `raw` string so upstream error handlers can log the unparseable response for debugging.

---

## Step 2 — Define model config

**File:** `packages/llm/src/config.ts`

Directly implements `tdd.md §5.4`:

```typescript
export const LLM_MODELS = {
  parse: process.env.ABACUSAI_PARSE_MODEL ?? "claude-sonnet-4-5",
  edit:  process.env.ABACUSAI_EDIT_MODEL  ?? "claude-sonnet-4-5",
} as const;
```

No other logic here. Keeping config in its own file means tests can mock env vars without touching provider logic.

---

## Step 3 — Implement parse system prompt

**File:** `packages/llm/src/prompts/parse.ts`

The prompt constant is the verbatim text from `tdd.md §5.5.1` with `{{TODAY_ISO}}` and `{{USER_TIME}}` as literal placeholders.

The injection function:

```typescript
export function buildParseSystemPrompt(todayISO: string, userTime: string): string {
  return PARSE_SYSTEM_PROMPT
    .replace("{{TODAY_ISO}}", todayISO)
    .replace("{{USER_TIME}}", userTime);
}
```

**Key detail:** Use a single `.replace()` per placeholder — the prompt contains each placeholder exactly once, so no need for a global regex.

---

## Step 4 — Implement edit system prompt

**File:** `packages/llm/src/prompts/edit.ts`

Same pattern as Step 3, but injects `TODAY_ISO` and `MEALS_CONTEXT`. `mealsContext` is serialised with `JSON.stringify(mealsContext, null, 2)` per `tdd.md §5.5.2`.

```typescript
import type { MealContext } from "../provider";

export function buildEditSystemPrompt(
  todayISO: string,
  mealsContext: MealContext[]
): string {
  return EDIT_SYSTEM_PROMPT
    .replace("{{TODAY_ISO}}", todayISO)
    .replace("{{MEALS_CONTEXT}}", JSON.stringify(mealsContext, null, 2));
}
```

---

## Step 5 — Implement `AbacusAIProvider`

**File:** `packages/llm/src/abacusai.ts`

```typescript
import OpenAI from "openai";
import { MealParseResultSchema, EditInstructionSchema } from "@diet-ai/shared";
import type { LLMProvider, MealContext } from "./provider";
import { LLMParseError } from "./provider";
import { LLM_MODELS } from "./config";
import { buildParseSystemPrompt } from "./prompts/parse";
import { buildEditSystemPrompt } from "./prompts/edit";
```

**Constructor:** Accepts an optional `OpenAI` client instance to allow injection in tests. Falls back to creating one from env vars.

```typescript
export class AbacusAIProvider implements LLMProvider {
  private client: OpenAI;

  constructor(client?: OpenAI) {
    this.client = client ?? new OpenAI({
      baseURL: "https://routellm.abacus.ai/v1",
      apiKey: process.env.ABACUSAI_API_KEY,
    });
  }
  ...
}
```

**`parseMessage` implementation:**

1. Call `buildParseSystemPrompt(todayISO, userTime)` to get the system prompt.
2. Call `this.client.chat.completions.create()` with:
   - `model: LLM_MODELS.parse`
   - `response_format: { type: "json_object" }`
   - `messages: [{ role: "system", content: systemPrompt }, { role: "user", content: rawText }]`
3. Extract `choices[0].message.content`.
4. If content is null or empty → throw `LLMParseError("Empty response from LLM", "")`.
5. Parse JSON with `JSON.parse()` inside a try/catch → throw `LLMParseError("Malformed JSON", raw)` on failure.
6. Validate with `MealParseResultSchema.safeParse(parsed)` → throw `LLMParseError("Schema mismatch: " + formatted errors, raw)` on failure.
7. Return validated data.

**`editMessage` implementation:** Same pattern but uses `buildEditSystemPrompt` and `EditInstructionSchema`.

---

## Step 6 — Implement provider factory

**File:** `packages/llm/src/factory.ts`

```typescript
import { AbacusAIProvider } from "./abacusai";
import type { LLMProvider } from "./provider";

export function createLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER ?? "abacusai";
  if (provider === "abacusai") {
    return new AbacusAIProvider();
  }
  throw new Error(`Unknown LLM_PROVIDER: "${provider}"`);
}
```

Only `abacusai` is supported at MVP. Throws a descriptive error for unknown values — this surfaces misconfiguration at startup rather than silently falling through.

---

## Step 7 — Update barrel export

**File:** `packages/llm/src/index.ts`

```typescript
export * from "./provider";
export * from "./config";
export * from "./factory";
export { buildParseSystemPrompt } from "./prompts/parse";
export { buildEditSystemPrompt } from "./prompts/edit";
export { AbacusAIProvider } from "./abacusai";
```

---

## Step 8 — Unit tests

**File:** `packages/llm/src/__tests__/abacusai.test.ts`

All tests mock the `OpenAI` client by injecting a fake client into the `AbacusAIProvider` constructor. No real HTTP calls are made.

**Test helper — mock client factory:**

```typescript
function makeMockClient(content: string | null) {
  return {
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content } }],
        }),
      },
    },
  } as unknown as OpenAI;
}
```

**Test cases for `parseMessage`:**

1. **Valid JSON response** → correctly parsed and returned as `MealParseResult`.
   - Input: valid JSON string matching `MealParseResultSchema`.
   - Assert: returned object equals the parsed schema output.

2. **Malformed JSON response** → `LLMParseError` thrown.
   - Input: `"not valid json {"`.
   - Assert: thrown error is `instanceof LLMParseError`, message contains "Malformed JSON".

3. **Schema mismatch response** → `LLMParseError` thrown.
   - Input: valid JSON but missing required fields (e.g. `{ "foo": "bar" }`).
   - Assert: thrown error is `instanceof LLMParseError`, message contains "Schema mismatch".

4. **`needs_clarification: true` response** → `clarification_question` is populated.
   - Input: valid JSON with `needs_clarification: true` and a non-null `clarification_question`.
   - Assert: returned object has `needs_clarification: true` and non-null `clarification_question`.

5. **Empty/null content from API** → `LLMParseError` thrown.
   - Input: `content: null`.
   - Assert: `LLMParseError` thrown.

**Test cases for `editMessage`:**

1. **Valid edit response** → correctly parsed and returned as `EditInstruction`.
2. **Malformed JSON** → `LLMParseError` thrown.
3. **Schema mismatch** (e.g. empty `operations` array) → `LLMParseError` thrown.

**File:** `packages/llm/src/__tests__/prompts.test.ts`

1. **`buildParseSystemPrompt`** → injects `TODAY_ISO` and `USER_TIME` at the correct positions; neither placeholder remains in the output.
2. **`buildEditSystemPrompt`** → injects `TODAY_ISO` and serialises `mealsContext` as JSON; neither placeholder remains in the output; the serialised context appears verbatim in the output.

**File:** `packages/llm/src/__tests__/factory.test.ts`

1. `LLM_PROVIDER=abacusai` (or unset) → returns an `AbacusAIProvider` instance.
2. `LLM_PROVIDER=unknown` → throws with a message referencing the invalid value.

---

## Step 9 — Build & test verification

Run from the repo root:

```bash
pnpm --filter @diet-ai/llm build
pnpm --filter @diet-ai/llm test
```

Both must exit cleanly before the task is considered done.

---

## Definition of Done Checklist

- [ ] `AbacusAIProvider.parseMessage()` returns a valid `MealParseResult` when called with a real API key (manual smoke test).
- [ ] Unit tests with mocked HTTP client cover: valid JSON, malformed JSON, schema mismatch, `needs_clarification: true` response.
- [ ] `buildParseSystemPrompt` injects `TODAY_ISO` and `USER_TIME` correctly.
- [ ] `buildEditSystemPrompt` injects `TODAY_ISO` and serialises `mealsContext` correctly.
- [ ] Provider factory returns `AbacusAIProvider` when `LLM_PROVIDER=abacusai`.
- [ ] `pnpm --filter @diet-ai/llm build` passes with no TypeScript errors.
- [ ] `pnpm --filter @diet-ai/llm test` passes with all tests green.
