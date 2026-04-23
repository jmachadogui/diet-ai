# T-21 — `packages/llm` — Replace AbacusAI Provider with OpenAI — Implementation Plan

**Task refs:** `docs/tasks.md §T-21`
**Related docs:** `docs/tdd.md §1`, `docs/tdd.md §4`, `docs/tdd.md §5.2`, `docs/tdd.md §5.4`, `docs/tdd.md §5.5`, `docs/tdd.md §14`, `docs/prd.md §FR-5`, `docs/prd.md §FR-6`, `docs/prd.md §FR-6a`, `docs/prd.md §FR-7`
**Depends on:** T-04, T-07 (already completed)

---

## Overview

`packages/llm` already has a stable provider abstraction, prompt builders, schema validation, and factory wiring. `T-21` is a migration task, not a greenfield build. The goal is to swap the current AbacusAI-backed implementation for an OpenAI-backed one without changing the surrounding pipeline contract.

The core deliverables are:

1. `OpenAIProvider` implementation in `packages/llm`
2. Updated config/env handling using OpenAI-specific variables
3. Updated provider factory defaulting to `openai`
4. Refreshed unit tests covering the OpenAI-backed provider and factory behavior
5. `.env.example` updates removing AbacusAI from the active runtime path
6. Design doc updates so `docs/tdd.md` matches the new default provider

The migration should preserve:

- `LLMProvider` interface in `packages/llm/src/provider.ts`
- Existing prompt builders in `packages/llm/src/prompts/*`
- Existing Zod validation flow and `LLMParseError`
- Existing `apps/api` usage through `createLLMProvider()`

---

## Current State Summary

Based on the current repo state:

- `packages/llm/src/abacusai.ts` contains the active provider implementation using `openai` SDK with `baseURL: https://routellm.abacus.ai/v1`.
- `packages/llm/src/config.ts` still reads `ABACUSAI_PARSE_MODEL` and `ABACUSAI_EDIT_MODEL`.
- `packages/llm/src/factory.ts` defaults `LLM_PROVIDER` to `abacusai` and only supports that provider.
- `.env.example` still exposes `ABACUSAI_API_KEY`, `ABACUSAI_BASE_URL`, and `ABACUSAI_MODEL`.
- `docs/tdd.md` still describes AbacusAI as the default provider and references AbacusAI env vars in the environment section.

This means the migration is mostly a contained refactor across `packages/llm`, docs, and env/config.

---

## Implementation Strategy

Keep the abstraction stable and swap the provider behind it. That means:

- do not change `LLMProvider` method signatures
- do not change how `apps/api` calls `createLLMProvider()`
- do not move prompt construction or schema ownership out of `packages/llm` / `packages/shared`
- do not introduce provider-specific logic into service or worker files

The migration should be implemented as a provider replacement, not as a pipeline redesign.

---

## Step 1 — Add OpenAI runtime config

**Files:** `packages/llm/src/config.ts`, `.env.example`

Replace AbacusAI-specific model env handling with OpenAI-specific configuration.

Target config shape:

```typescript
export const LLM_MODELS = {
  parse: process.env.OPENAI_PARSE_MODEL ?? process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
  edit: process.env.OPENAI_EDIT_MODEL ?? process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
} as const;
```

Planned env changes:

- `LLM_PROVIDER=openai`
- `OPENAI_API_KEY=`
- `OPENAI_MODEL=...`
- optional overrides:
  - `OPENAI_PARSE_MODEL=`
  - `OPENAI_EDIT_MODEL=`

Design notes:

- Keep model selection centralized in `config.ts`.
- Prefer a shared `OPENAI_MODEL` plus per-operation overrides to stay consistent with the existing `parse` / `edit` split.
- Remove AbacusAI env vars from the active runtime path in `.env.example`.

---

## Step 2 — Implement `OpenAIProvider`

**File:** `packages/llm/src/openai.ts`

Create a new provider class that mirrors the current `AbacusAIProvider` behavior but targets direct OpenAI.

Implementation shape:

```typescript
import OpenAI from "openai";
import { MealParseResultSchema, EditInstructionSchema } from "@diet-ai/shared";
import type { LLMProvider, MealContext, MealParseResult, EditInstruction } from "./provider";
import { LLMParseError } from "./provider";
import { LLM_MODELS } from "./config";
import { buildParseSystemPrompt } from "./prompts/parse";
import { buildEditSystemPrompt } from "./prompts/edit";

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;

  constructor(client?: OpenAI) {
    this.client = client ?? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
}
```

Method behavior should remain aligned with the current provider:

1. Build the system prompt.
2. Call `client.chat.completions.create(...)`.
3. Extract `choices[0].message.content`.
4. Strip code fences if present.
5. Parse JSON.
6. Validate with Zod.
7. Throw `LLMParseError` on empty response, malformed JSON, or schema mismatch.

Design notes:

- Reuse the current `stripCodeFences()` helper logic so behavior does not regress.
- Keep constructor injection for tests exactly as in the current provider.
- Do not add provider-specific branching elsewhere in the package.

---

## Step 3 — Decide the provider replacement shape

**Files:** `packages/llm/src/abacusai.ts`, `packages/llm/src/openai.ts`, `packages/llm/src/index.ts`

Preferred approach:

- add `packages/llm/src/openai.ts`
- update factory and exports to use `OpenAIProvider`
- remove `abacusai.ts` after all imports and tests are migrated

Why this approach:

- It keeps the migration explicit and easy to review.
- It avoids a confusing rename-in-place where a file called `abacusai.ts` suddenly contains OpenAI logic.
- It makes doc and test updates clearer because references to `AbacusAIProvider` can be intentionally removed.

If there is any local usage still importing `AbacusAIProvider` directly, migrate those imports before deleting the file.

---

## Step 4 — Update the provider factory

**File:** `packages/llm/src/factory.ts`

Change the default factory selection from `abacusai` to `openai`.

Target behavior:

```typescript
import { OpenAIProvider } from "./openai";
import type { LLMProvider } from "./provider";

export function createLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER ?? "openai";
  if (provider === "openai") {
    return new OpenAIProvider();
  }
  throw new Error(`Unknown LLM_PROVIDER: "${provider}"`);
}
```

Design notes:

- Keep the factory strict: misconfiguration should still fail fast.
- Do not silently alias `abacusai` to `openai`; the task explicitly replaces the active provider and removes AbacusAI from the runtime path.

---

## Step 5 — Update package exports

**File:** `packages/llm/src/index.ts`

Update the barrel export to expose `OpenAIProvider` instead of `AbacusAIProvider`.

Target exports:

```typescript
export * from "./provider";
export * from "./config";
export * from "./factory";
export { buildParseSystemPrompt } from "./prompts/parse";
export { buildEditSystemPrompt } from "./prompts/edit";
export { OpenAIProvider } from "./openai";
```

After this step, there should be no public export of `AbacusAIProvider`.

---

## Step 6 — Update provider unit tests

**Files:** `packages/llm/src/__tests__/abacusai.test.ts`, `packages/llm/src/__tests__/factory.test.ts`

Rename and rewrite the tests around `OpenAIProvider`.

Planned test changes:

1. Rename `abacusai.test.ts` to `openai.test.ts`.
2. Replace `AbacusAIProvider` imports/usages with `OpenAIProvider`.
3. Keep the same behavioral coverage:
   - valid parse response
   - malformed JSON
   - schema mismatch
   - clarification-required parse response
   - empty/null content
   - valid edit response
   - malformed edit JSON
   - schema mismatch on edit response
4. Keep constructor injection with a fake `OpenAI` client so no HTTP mocking library is needed.

Factory test changes:

1. Default unset `LLM_PROVIDER` should return `OpenAIProvider`.
2. `LLM_PROVIDER=openai` should return `OpenAIProvider`.
3. Unknown provider should still throw.
4. Swap env setup from `ABACUSAI_API_KEY` to `OPENAI_API_KEY`.

---

## Step 7 — Verify app wiring remains unchanged

**Files:** `apps/api/src/index.ts`, `apps/api/src/__tests__/*.test.ts`

No architectural change is expected in `apps/api`, but this step is a safety pass:

- confirm `apps/api` only depends on `createLLMProvider()` and not on provider class names
- confirm existing API tests that mock `@diet-ai/llm` do not need structural changes beyond possible environment assumptions
- confirm there is no AbacusAI-specific env read outside `packages/llm`

Expected result:

- `apps/api/src/index.ts` should remain unchanged or only require trivial compatibility edits
- package-level factory replacement should be sufficient for runtime wiring

---

## Step 8 — Update design docs and environment docs

**Files:** `docs/tdd.md`, `.env.example`

Update docs so they reflect OpenAI as the active/default provider.

Specific doc areas to update in `docs/tdd.md`:

- overview principle calling the system "LLM-agnostic"
- package description for `packages/llm`
- `§5.2 LLM Abstraction`
- provider implementation details section
- `§5.4` model configuration examples
- `§14 Environment & Local Development`
- dependency/env tables mentioning AbacusAI

Documentation goals:

- describe `OpenAIProvider` as the default implementation
- update sample env vars to `OPENAI_*`
- remove references that imply AbacusAI is still the active provider
- preserve the claim that the architecture remains provider-agnostic

---

## Step 9 — Build and test verification

**Commands to run during implementation**

```bash
pnpm --filter @diet-ai/llm build
pnpm --filter @diet-ai/llm test
pnpm build
pnpm test
```

Verification goals:

- `packages/llm` compiles after the provider rename/replacement
- the full workspace still compiles
- no tests fail due to env name drift or class rename drift

---

## Step 10 — Manual smoke test

**Purpose:** satisfy the manual DoD items for real OpenAI integration

Suggested smoke checks:

1. Set `LLM_PROVIDER=openai`
2. Set `OPENAI_API_KEY`
3. Optionally set `OPENAI_MODEL`, `OPENAI_PARSE_MODEL`, and `OPENAI_EDIT_MODEL`
4. Execute a small script or existing manual harness against `packages/llm`
5. Verify:
   - `parseMessage()` returns a valid `MealParseResult`
   - `editMessage()` returns a valid `EditInstruction`

Suggested sample inputs:

- Parse: `"I had 200g grilled chicken and rice for lunch"`
- Edit: `"Actually remove the rice from my lunch"`

The smoke test should be cleaned up afterward if a temporary script is created.

---

## Expected File Changes

**Create**

- `packages/llm/src/openai.ts`
- `packages/llm/src/__tests__/openai.test.ts`

**Modify**

- `packages/llm/src/config.ts`
- `packages/llm/src/factory.ts`
- `packages/llm/src/index.ts`
- `packages/llm/src/__tests__/factory.test.ts`
- `.env.example`
- `docs/tdd.md`

**Delete or replace**

- `packages/llm/src/abacusai.ts`
- `packages/llm/src/__tests__/abacusai.test.ts`

---

## Risks and Checks

1. OpenAI model defaults may differ from the AbacusAI-routed behavior.
   Plan: keep model names configurable entirely via env vars and avoid hardcoding provider-specific assumptions outside `config.ts`.

2. The OpenAI SDK response shape may vary slightly across model families.
   Plan: preserve defensive extraction of `choices[0].message.content` and keep strict Zod validation.

3. Tests may fail from env name drift rather than logic regressions.
   Plan: update `factory.test.ts` and any env setup helpers in the same change.

4. Documentation may become inconsistent if only code is updated.
   Plan: treat `docs/tdd.md` and `.env.example` as part of the implementation, not follow-up cleanup.

---

## Definition of Done Checklist

- [ ] `OpenAIProvider.parseMessage()` returns a valid `MealParseResult` when called with a real OpenAI API key.
- [ ] `OpenAIProvider.editMessage()` returns a valid `EditInstruction` when called with a real OpenAI API key.
- [ ] Unit tests with mocked HTTP client cover valid JSON, malformed JSON, schema mismatch, and clarification-required responses for the OpenAI-backed provider.
- [ ] Provider factory returns `OpenAIProvider` when `LLM_PROVIDER=openai` and when `LLM_PROVIDER` is unset.
- [ ] No AbacusAI-specific env vars are required anywhere in the active runtime path after the migration.
- [ ] `pnpm --filter @diet-ai/llm build`, `pnpm --filter @diet-ai/llm test`, `pnpm build`, and `pnpm test` all pass after the replacement.
