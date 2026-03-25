# Project Journal

---

## 2026-03-18 — T-02: Prisma Schema & Database Setup

### Created feature branch
- Branched off `master` into `feat/t-02-prisma-schema-db-setup` before making any changes, following the git workflow rules.

### Step 1 — Updated `packages/db/package.json`
- Added `postinstall: "prisma generate"` so the client regenerates automatically after installs.
- Renamed existing scripts to match the plan: `db:migrate`, `db:generate`, `db:studio`.

### Steps 2–11 — Created `packages/db/prisma/schema.prisma`
Defined all 9 models mapped to the ERD:

| Model | Table | Notable constraints |
|---|---|---|
| `User` | `users` | — |
| `UserIdentity` | `user_identities` | `@@unique([platform, platformUserId])`, `@@index([userId])` |
| `MagicLinkToken` | `magic_link_tokens` | `@@unique([token])`, `@@index([userId, platform])` |
| `Log` | `logs` | `@@index([userId, createdAt])` |
| `Meal` | `meals` | `@@index([userId, consumedAt])` |
| `MealItem` | `meal_items` | cascade delete from `Meal` |
| `ApiCache` | `api_cache` | `@@unique([normalizedQueryHash])`, `@@index([expiresAt])` |
| `UserWeightHistory` | `user_weight_history` | `@@index([userId, recordedAt])` |
| `EditHistory` | `edit_history` | `@@index([userId, changedAt])` |

All cascade deletes, composite unique constraints, and indexes specified in `tdd.md §6.1` are in place.

### Blocked — Step 12: First migration
`docker` is not available in this environment and no local PostgreSQL instance is running. `prisma migrate dev` cannot proceed until the database is up.

## 2026-03-19 — T-02: Prisma Schema & Database Setup (continued)

### Step 12 — First migration
- Started PostgreSQL and Redis via `docker compose -f infra/docker-compose.yml up -d`.
- Ran `pnpm --filter @diet-ai/db db:migrate --name init` — migration `20260318235534_init` applied cleanly.
- Migration SQL committed under `packages/db/prisma/migrations/20260318235534_init/migration.sql`.
- Ran `pnpm --filter @diet-ai/db db:generate` — Prisma Client generated to `packages/db/src/generated/client`.

### Step 13 — Singleton Prisma client
- Created `packages/db/src/client.ts` with the standard dev hot-reload guard (`globalThis.prisma`).

### Step 14 — Repository helpers
Created one file per entity under `packages/db/src/repositories/`:

| File | Key functions |
|---|---|
| `user.repository.ts` | `createUser`, `findUserByEmail`, `findUserById`, `updateUser` |
| `userIdentity.repository.ts` | `upsertIdentity`, `findIdentity` |
| `magicLinkToken.repository.ts` | `createToken`, `findValidToken`, `markTokenUsed` |
| `log.repository.ts` | `createLog`, `updateLog`, `findLogsByUser` |
| `meal.repository.ts` | `createMealWithItems` (transactional), `findMealsByDay`, `findMealById`, `updateMealTotals`, `deleteMeal` |
| `mealItem.repository.ts` | `addMealItem`, `updateMealItem`, `deleteMealItem` |
| `apiCache.repository.ts` | `findCache`, `upsertCache` |
| `userWeightHistory.repository.ts` | `recordWeight`, `getWeightHistory` |
| `editHistory.repository.ts` | `createEditHistory`, `findEditsByMeal` |

### Step 15 — Barrel export
- Updated `packages/db/src/index.ts` to re-export `prisma`, all repository functions, and Prisma-generated types.

### Step 16 — Repository unit tests
- Created `packages/db/src/__mocks__/client.ts` as a manual Jest mock for the Prisma client.
- Created `packages/db/src/repositories/__tests__/repositories.test.ts` with 22 tests covering all repositories.
- All 22 tests pass.

### Step 17 — DoD verification
- `docker compose up -d` ✓
- `pnpm --filter @diet-ai/db db:migrate` ✓ (already applied)
- `pnpm --filter @diet-ai/db db:generate` ✓
- `pnpm build` ✓ all packages compile cleanly
- `pnpm test` ✓ 22/22 tests pass

---

## 2026-03-19 — T-03: `packages/shared` — Zod Schemas & Common Types

**Branch:** `feat/t-03-shared-zod-schemas`

**Steps taken:**
- Created `packages/shared/src/enums.ts` with `PlatformEnum`, `MealOccasionEnum`, `IntentEnum` and inferred types.
- Created `packages/shared/src/messaging.ts` with `IncomingMessageSchema` (using `z.coerce.date()` for BullMQ JSON deserialisation) and `OutgoingMessageSchema`.
- Created `packages/shared/src/llm.ts` with `MealItemSchema`, `MealParseResultSchema`, `EditOperationSchema`, `EditInstructionSchema`. Both LLM result schemas enforce the `needs_clarification` / `clarification_question` cross-field constraint via `.superRefine()`. `EditInstructionSchema` uses `z.literal("edit_meal")` and excludes `"unknown"` from `target_occasion`.
- Created `packages/shared/src/nutrition.ts` with `NutritionQuerySchema` and `NutritionResultSchema`.
- Updated `packages/shared/src/index.ts` as a barrel re-export of all modules.
- Added 33 unit tests across 4 test files covering valid and invalid inputs for every schema.

**Decisions made:**
- `consumed_at` kept as `z.string().datetime({ offset: true }).nullable()` to preserve timezone offset; coercion to `Date` happens in the API worker at write time.
- Cross-field constraint on `needs_clarification` / `clarification_question` applied in both `MealParseResultSchema` and `EditInstructionSchema` via `.superRefine()`.
- No new runtime dependencies added; `zod` was already present in `packages/shared`.

**Blockers:**
- SSH connectivity from agent environment prevented `git push`. Branch is committed locally; push and PR must be done manually.

**DoD verification:**
- [x] All schemas compile with no TypeScript errors (`pnpm build` passed).
- [x] Each schema has at least one passing valid-input test and one failing invalid-input test (`pnpm test`: 33 tests, all passed).
- [x] Inferred types (`z.infer<typeof ...>`) are exported and usable without type errors.
- [x] `packages/shared` has no runtime dependencies other than `zod`.
- [x] `needs_clarification` / `clarification_question` cross-field constraint enforced by `superRefine` and covered by tests in both schemas.

---

## 2026-03-24 — T-04: `packages/llm` — LLM Provider Abstraction & AbacusAI Implementation (planning)

**Branch:** `feat/t-04-llm-provider`

**Steps taken:**
- Read `docs/tasks.md §T-04`, `tdd.md §5.2`, `tdd.md §5.4`, `tdd.md §5.5.1`, `tdd.md §5.5.2`, and `packages/shared/src/llm.ts` to understand the full scope before planning.
- Confirmed T-03 is complete and all required Zod schemas (`MealParseResultSchema`, `EditInstructionSchema`) are exported from `@diet-ai/shared`.
- Confirmed `packages/llm` already has `package.json` with `openai` and `@diet-ai/shared` dependencies, a stub `src/index.ts`, and jest/ts-jest dev tooling in place.
- Created `docs/plans/t-04-plan.md` with a 9-step implementation plan covering: `provider.ts`, `config.ts`, `prompts/parse.ts`, `prompts/edit.ts`, `abacusai.ts`, `factory.ts`, `index.ts`, unit tests, and build/test verification.
- Created feature branch `feat/t-04-llm-provider` off `master`.

**Decisions made:**
- `parseMessage` and `editMessage` accept caller-provided `todayISO`, `userTime`, and `mealsContext` rather than computing them internally — keeps the provider deterministic and fully testable without time or DB mocking.
- `LLMParseError` carries a `raw` string field so upstream handlers can log the exact unparseable payload.
- `AbacusAIProvider` constructor will accept an optional injected `OpenAI` client to allow unit tests to pass a fake client without HTTP mocking libraries.
- Types (`MealParseResult`, `EditInstruction`) imported from `@diet-ai/shared` — not re-defined — to honour the single-source-of-truth principle.

**Blockers:**
- None. Implementation not yet started; plan created and ready for next session.

**DoD verification:**
- [ ] `AbacusAIProvider.parseMessage()` returns a valid `MealParseResult` when called with a real API key (manual smoke test).
- [ ] Unit tests with mocked HTTP client cover: valid JSON, malformed JSON, schema mismatch, `needs_clarification: true` response.
- [ ] `buildParseSystemPrompt` injects `TODAY_ISO` and `USER_TIME` correctly.
- [ ] `buildEditSystemPrompt` injects `TODAY_ISO` and serialises `mealsContext` correctly.
- [ ] Provider factory returns `AbacusAIProvider` when `LLM_PROVIDER=abacusai`.
- [ ] `pnpm --filter @diet-ai/llm build` passes with no TypeScript errors.
- [ ] `pnpm --filter @diet-ai/llm test` passes with all tests green.

---

## 2026-03-25 — T-04: `packages/llm` — LLM Provider Abstraction & AbacusAI Implementation (implementation)

**Branch:** `feat/t-04-llm-provider`

**Steps taken:**
- Created `packages/llm/src/provider.ts` with `LLMProvider` interface, `MealContext` type, `LLMParseError` class. Types `MealParseResult` and `EditInstruction` are imported and re-exported from `@diet-ai/shared`.
- Created `packages/llm/src/config.ts` with `LLM_MODELS` constant (parse + edit keys, defaulting to `claude-sonnet-4-5`).
- Created `packages/llm/src/prompts/parse.ts` with verbatim parse system prompt (from `tdd.md §5.5.1`) and `buildParseSystemPrompt(todayISO, userTime)` injection function.
- Created `packages/llm/src/prompts/edit.ts` with verbatim edit system prompt (from `tdd.md §5.5.2`) and `buildEditSystemPrompt(todayISO, mealsContext)` injection function.
- Created `packages/llm/src/abacusai.ts` with `AbacusAIProvider` implementing `LLMProvider`. Constructor accepts optional injected `OpenAI` client. Both methods use `response_format: { type: "json_object" }`, validate responses via `MealParseResultSchema` / `EditInstructionSchema`, and throw `LLMParseError` on empty content, malformed JSON, or schema mismatch.
- Created `packages/llm/src/factory.ts` with `createLLMProvider()` factory; throws a descriptive error for unknown `LLM_PROVIDER` values.
- Updated `packages/llm/src/index.ts` barrel to export all public symbols.
- Created 13 unit tests across 3 files (`abacusai.test.ts`, `prompts.test.ts`, `factory.test.ts`). Factory tests set a dummy `ABACUSAI_API_KEY` in `beforeEach` to satisfy the OpenAI SDK constructor validation without a real key.

**Decisions made:**
- Unused `LLMParseError` import removed from test file to satisfy TypeScript strict mode (`error TS6133`).
- Factory tests inject `ABACUSAI_API_KEY=test-key` via `beforeEach` / restore in `afterEach` to avoid needing a real key while still exercising the factory path end-to-end.

**Blockers:**
- `ABACUSAI_API_KEY` not available in agent environment; manual smoke test (DoD item 1) cannot be verified automatically.

**DoD verification:**
- [ ] `AbacusAIProvider.parseMessage()` returns a valid `MealParseResult` when called with a real API key (manual smoke test — requires `ABACUSAI_API_KEY`).
- [x] Unit tests with mocked HTTP client cover: valid JSON, malformed JSON, schema mismatch, `needs_clarification: true` response.
- [x] `buildParseSystemPrompt` injects `TODAY_ISO` and `USER_TIME` correctly.
- [x] `buildEditSystemPrompt` injects `TODAY_ISO` and serialises `mealsContext` correctly.
- [x] Provider factory returns `AbacusAIProvider` when `LLM_PROVIDER=abacusai`.
- [x] `pnpm --filter @diet-ai/llm build` passes with no TypeScript errors.
- [x] `pnpm --filter @diet-ai/llm test` passes with all 13 tests green.

### Amendment — 2026-03-25 (smoke test & code fence fix)

- Ran manual smoke test against the real AbacusAI API using `ABACUSAI_API_KEY` from `.env`.
- Discovered the model returned valid JSON wrapped in markdown code fences (` ```json ... ``` `) despite the system prompt instructing raw JSON only.
- Added `stripCodeFences(s)` helper to `abacusai.ts` — strips leading ` ```json ` / ` ``` ` and trims whitespace before `JSON.parse` in both `parseMessage` and `editMessage`.
- Re-ran `pnpm --filter @diet-ai/llm build` and `pnpm --filter @diet-ai/llm test` — both still pass (13 tests green, 0 TS errors).
- Smoke test confirmed: `parseMessage()` returned a fully valid `MealParseResult` against the live API.
- Deleted `smoke.ts`.

**DoD verification (final):**
- [x] `AbacusAIProvider.parseMessage()` returns a valid `MealParseResult` when called with a real API key.
- [x] Unit tests with mocked HTTP client cover: valid JSON, malformed JSON, schema mismatch, `needs_clarification: true` response.
- [x] `buildParseSystemPrompt` injects `TODAY_ISO` and `USER_TIME` correctly.
- [x] `buildEditSystemPrompt` injects `TODAY_ISO` and serialises `mealsContext` correctly.
- [x] Provider factory returns `AbacusAIProvider` when `LLM_PROVIDER=abacusai`.
- [x] `pnpm --filter @diet-ai/llm build` passes with no TypeScript errors.
- [x] `pnpm --filter @diet-ai/llm test` passes with all 13 tests green.
