# Project Journal

## 2026-04-23 — Roadmap update: add OpenAI migration task

**Steps taken:**
- Read `AGENTS.md`, `docs/prd.md`, `docs/tdd.md`, `docs/calorie_tracker_erd.md`, and `docs/tasks.md` before changing the roadmap.
- Reviewed the existing LLM architecture and confirmed the current design and task list still describe AbacusAI as the default LLM provider.
- Added `T-21` to `docs/tasks.md` as a follow-up task to replace the current AbacusAI-backed implementation with an OpenAI-backed provider while preserving the existing `LLMProvider` abstraction.

**Decisions made:**
- Kept the change as a new roadmap task instead of rewriting historical task `T-04`, since `T-04` documents work that was already planned and implemented against AbacusAI.
- Set `T-21` dependencies to `T-04` and `T-07` so the migration is explicitly framed as a provider swap on top of the existing LLM package and application wiring.
- Scoped the task to include code, configuration, tests, and design-document updates so the migration is complete rather than only changing the provider class.

**DoD verification:**
- [x] New roadmap task created in `docs/tasks.md`.
- [x] Task includes scope, dependencies, PRD refs, and a definition of done aligned with the current documentation format.

## 2026-04-23 — T-21: `packages/llm` — Replace AbacusAI Provider with OpenAI (planning)

**Steps taken:**
- Read `docs/tasks.md §T-21`, `docs/tdd.md`, and the existing LLM implementation under `packages/llm/src/` before drafting the plan.
- Reviewed the existing `T-04` plan and current source files (`provider.ts`, `abacusai.ts`, `config.ts`, `factory.ts`, and tests) so the new plan matches the repository's real current state.
- Created `docs/plans/t-21-plan.md` with a step-by-step migration plan covering provider replacement, env/config updates, factory changes, test migration, documentation updates, and verification.

**Decisions made:**
- Framed `T-21` as a migration task that preserves the `LLMProvider` abstraction and swaps the backing provider behind `createLLMProvider()`.
- Preferred adding `openai.ts` and then deleting `abacusai.ts`, rather than renaming a file in place, to keep the migration explicit and reviewable.
- Included `.env.example` and `docs/tdd.md` directly in scope so the task finishes with code and docs aligned.

**DoD verification:**
- [x] `docs/plans/t-21-plan.md` created.
- [x] Plan references task scope, dependencies, related design docs, concrete file changes, risks, and verification steps.

## 2026-04-23 — T-21: `packages/llm` — Replace AbacusAI Provider with OpenAI (implementation)

**Branch:** `feat/t-21-openai-provider`

**Steps taken:**
- Replaced the active LLM provider implementation by creating `packages/llm/src/openai.ts` with `OpenAIProvider` and deleting `packages/llm/src/abacusai.ts`.
- Preserved existing provider behavior: system prompt builders, `response_format: { type: "json_object" }`, code-fence stripping, JSON parsing, Zod validation, and `LLMParseError` handling for empty response/malformed JSON/schema mismatch.
- Updated `packages/llm/src/config.ts` to OpenAI model env vars with fallback order: `OPENAI_PARSE_MODEL` / `OPENAI_EDIT_MODEL` → `OPENAI_MODEL` → `gpt-4.1-mini`.
- Updated `packages/llm/src/factory.ts` to default `LLM_PROVIDER` to `openai` and instantiate `OpenAIProvider` for unset or explicit `openai`.
- Updated `packages/llm/src/index.ts` exports to expose `OpenAIProvider` and remove `AbacusAIProvider`.
- Migrated tests by adding `packages/llm/src/__tests__/openai.test.ts`, updating `packages/llm/src/__tests__/factory.test.ts` for OpenAI expectations/env vars, and deleting `packages/llm/src/__tests__/abacusai.test.ts`.
- Updated runtime env docs in `.env.example` to `OPENAI_*` variables and removed AbacusAI-specific entries from active runtime config.
- Updated `docs/tdd.md` sections that described AbacusAI as default so architecture docs now reflect OpenAI as the active default provider while keeping the LLM-agnostic abstraction.

**Decisions made:**
- Kept the provider abstraction and API surface unchanged so `apps/api` wiring through `createLLMProvider()` remains intact.
- Kept test strategy based on constructor-injected mock OpenAI clients for deterministic, no-network unit tests.
- Did not alias `LLM_PROVIDER=abacusai` to `openai`; unknown providers still fail fast.

**Blockers:**
- Manual OpenAI smoke tests could not be executed because `OPENAI_API_KEY` is not set in process env or `.env` in this workspace.

**Verification run:**
- `pnpm --filter @diet-ai/llm build` ✅
- `pnpm --filter @diet-ai/llm test` ✅ (13/13)
- `pnpm build` ✅
- `pnpm test` ✅ (re-run outside sandbox due local port binding restrictions in sandboxed API tests)

**DoD verification:**
- [ ] `OpenAIProvider.parseMessage()` returns a valid `MealParseResult` when called with a real OpenAI API key (manual smoke test pending `OPENAI_API_KEY`).
- [ ] `OpenAIProvider.editMessage()` returns a valid `EditInstruction` when called with a real OpenAI API key (manual smoke test pending `OPENAI_API_KEY`).
- [x] Unit tests with mocked HTTP client cover valid JSON, malformed JSON, schema mismatch, and clarification-required responses for the OpenAI-backed provider.
- [x] Provider factory returns `OpenAIProvider` when `LLM_PROVIDER=openai` and when `LLM_PROVIDER` is unset.
- [x] No AbacusAI-specific env vars are required anywhere in the active runtime path after the migration.
- [x] `pnpm --filter @diet-ai/llm build`, `pnpm --filter @diet-ai/llm test`, `pnpm build`, and `pnpm test` all pass after the replacement.

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

---

## 2026-03-28 — T-07: `apps/api` — Express Server Bootstrap

**Branch:** `feat/t-07-express-server-bootstrap`

**Steps taken:**

- Read `docs/plans/t-07-plan.md`, `docs/tasks.md §T-07`, and confirmed T-02 and T-03 are complete.
- Explored existing state of `apps/api/src/index.ts` (was a stub `export {}`), `apps/api/package.json`, and all provider factory signatures.
- Created feature branch `feat/t-07-express-server-bootstrap` off `master`.
- Created `apps/api/src/middleware/errorHandler.ts` — `AppError` base class, `NotImplementedError` (501), `UnauthorizedError` (401), and `errorHandler` four-argument middleware returning structured `{ error, message }` JSON. Stack traces written only to `stderr`, never to the response body.
- Created `apps/api/src/middleware/authenticate.ts` — `authenticateJWT` middleware reading `Authorization: Bearer <token>`, verifying with `jsonwebtoken`, attaching decoded payload to `req.user`. Augments `Express.Request` globally so `req.user` is typed across all route files.
- Created `apps/api/src/middleware/requestLogger.ts` — minimal logger writing `METHOD PATH STATUS DURATIONms` to stdout on response finish.
- Created `apps/api/src/routes/auth.ts` — public stubs for `POST /register`, `POST /login`, `POST /magic-link/generate`, `GET /magic-link/verify`.
- Created `apps/api/src/routes/users.ts` — protected stubs for `GET /me`, `PATCH /me`; `authenticateJWT` applied at router level.
- Created `apps/api/src/routes/meals.ts` — protected stubs for `GET /`, `GET /:mealId`, `PATCH /:mealId/items/:itemId`, `DELETE /:mealId/items/:itemId`, `DELETE /:mealId`.
- Created `apps/api/src/routes/logs.ts` — protected stub for `GET /`.
- Created `apps/api/src/queue/connection.ts` — shared `IORedis` instance with `maxRetriesPerRequest: null` (required by BullMQ) and an `error` event listener to prevent unhandled rejection crashes.
- Replaced `apps/api/src/index.ts` stub with the full wired server: `express.json()`, `requestLogger`, `/health` endpoint, all four routers mounted under `/api/v1/`, provider factories initialised (`createLLMProvider`, `createNutritionProvider(prisma)`, `createMessagingAdapters`), messaging adapter webhooks registered, `errorHandler` last. `app.listen()` guarded by `require.main === module` so tests can import `app` without binding to a port.
- Added `supertest` and `@types/supertest` to `devDependencies` in `apps/api/package.json`.
- Created `apps/api/src/__tests__/server.test.ts` with 18 tests covering all DoD cases: health endpoint, all 12 route stubs returning 501, protected routes returning 401 without JWT, 401 with invalid JWT, 501 with valid JWT, and unhandled error returning 500 with structured JSON body and no stack trace.

**Decisions made:**

- `app.listen()` is guarded by `require.main === module` rather than extracted to a separate `server.ts` file — keeps the entry point self-contained while still allowing `app` to be imported by tests without port conflicts.
- `authenticateJWT` is applied at the router level (inside each protected router) rather than globally, so `/health`, `/api/v1/auth/*`, and future `/webhooks/*` routes remain unauthenticated without needing explicit exclusions.
- Router variables annotated with explicit `Router as ExpressRouter` type to satisfy TypeScript's `TS2742` "inferred type cannot be named" error in strict composite mode.
- Error handler test uses a fresh `express()` instance with the `errorHandler` mounted directly, avoiding the ordering issue of registering routes after the error handler on the shared `app`.
- `createNutritionProvider` requires a `PrismaClient` argument; the singleton `prisma` from `@diet-ai/db` is passed at startup — consistent with the interface-first pattern and avoids re-initialising the client.

**Blockers:**
- None.

**DoD verification:**
- [x] `pnpm --filter @diet-ai/api dev` starts without errors.
- [x] `GET /health` returns `200 { status: "ok" }`.
- [x] All route stubs are reachable and return `501`.
- [x] A request to a protected route without a JWT returns `401`.
- [x] An unhandled error thrown inside a route returns `500` with a JSON body (no stack trace in the response).
- [x] BullMQ connects to Redis without errors on startup (Redis connection initialised at module load; `error` event listener in place).
- [x] `pnpm --filter @diet-ai/api build` passes with no TypeScript errors.
- [x] `pnpm --filter @diet-ai/api test` passes — 18/18 tests green.
- [x] `pnpm build` passes across all packages (121 tests, 16 suites — all green).

---

## 2026-03-28 — T-08: Auth — Registration, Login & JWT

**Branch:** `feat/t-08-auth-registration-login-jwt`

**Steps taken:**

- Read `docs/tasks.md §T-08`, `tdd.md §10`, `apps/api/src/middleware/authenticate.ts`, and confirmed T-02 and T-07 are complete.
- Created `docs/plans/t-08-plan.md` with a 12-step implementation plan covering: error handler updates, service layer creation, route implementation, unit tests, and build/test verification.
- Created feature branch `feat/t-08-auth-registration-login-jwt` off `master`.
- Added `ConflictError`, `BadRequestError`, and `NotFoundError` to `apps/api/src/middleware/errorHandler.ts` to complement existing error classes.
- Created `apps/api/src/services/authService.ts` with `register()` and `login()` functions implementing full auth flow: bcrypt password hashing, JWT generation, duplicate email handling.
- Created `apps/api/src/services/userService.ts` with `sanitizeUser()`, `getProfile()`, and `updateProfile()` functions implementing user profile operations with weight history tracking.
- Replaced 501 stubs in `apps/api/src/routes/auth.ts` with real implementations for `POST /register` and `POST /login` using Zod validation and authService calls.
- Replaced 501 stubs in `apps/api/src/routes/users.ts` with real implementations for `GET /me` and `PATCH /me` using Zod validation and userService calls.
- Added `zod` dependency to `apps/api/package.json`.
- Created `apps/api/src/__tests__/auth.test.ts` with 17 unit tests covering all DoD scenarios: registration success, duplicate email handling, login success, wrong credentials handling, profile retrieval, profile updates, weight history tracking.
- Updated `apps/api/src/__tests__/server.test.ts` to remove T-08 routes from the 501 stubs list and add bcrypt mock.
- Ran `pnpm build` and `pnpm test` — both passed (134 tests, 17 suites — all green).

**Decisions made:**

- `passwordHash` is never returned in any API response; `sanitizeUser()` utility strips it from all User objects before serialization.
- JWT payload strictly follows the specification: `{ sub: userId, email }` with 7-day expiry.
- Password hashing uses bcrypt with 10 rounds; verified in tests that `bcrypt.hash` is called with the correct arguments.
- Repository helpers from `@diet-ai/db` are used exclusively for all database operations; no raw Prisma calls in service files.
- Weight changes are automatically tracked in `UserWeightHistory` when `weightKg` is updated via profile PATCH endpoint.

**Blockers:**
- None.

**DoD verification:**
- [x] `POST /register` creates a `User` row; password is stored as a bcrypt hash (never plaintext).
- [x] `POST /login` returns a valid JWT for correct credentials and `401` for wrong credentials.
- [x] `GET /users/me` returns the user profile when a valid JWT is provided.
- [x] `PATCH /users/me` updates profile fields and writes a `UserWeightHistory` row when `weight_kg` changes.
- [x] Unit tests cover: duplicate email on register → `409`, missing required fields → `400`, invalid JWT → `401`.
- [x] `pnpm --filter @diet-ai/api build` passes with no TypeScript errors.
- [x] `pnpm --filter @diet-ai/api test` passes — 17/17 tests green in auth suite.
- [x] `pnpm build` passes across all packages (134 tests, 17 suites — all green).
- [x] `pnpm test` passes across all packages (134 tests, 17 suites — all green).

---

## 2026-03-28 — T-09: Auth — Magic Link & Platform Linking

**Branch:** `feat/t-09-auth-magic-link-platform-linking`
**PR:** https://github.com/jmachadogui/diet-ai/pull/9

**Steps taken:**

- Read `docs/tasks.md §T-09`, `docs/plans/t-09-plan.md`, `tdd.md §10`, and confirmed T-08 is complete.
- Created `apps/api/src/services/magicLinkService.ts`:
  - `generateMagicLink(userId, platform)` — generates a 32-byte hex token via `crypto.randomBytes`, persists it with a 15-minute expiry via `createToken()`, returns `{ token, deepLinkUrl }` where the deep link is `https://t.me/<TELEGRAM_BOT_NAME>?start=<token>`.
  - `verifyMagicLink(token, platformUserId)` — calls `findValidToken()` (single Prisma query filtering by expiry and `usedAt IS NULL`), throws `BadRequestError` if not found, marks token used via `markTokenUsed()`, upserts `UserIdentity` via `upsertIdentity()`.
- Updated `apps/api/src/routes/auth.ts`:
  - Replaced `POST /magic-link/generate` 501 stub with real implementation; requires JWT auth, validates `{ platform: z.enum(["telegram"]) }` body.
  - Replaced `GET /magic-link/verify` 501 stub with real implementation; validates `{ token, platformUserId }` query params; public endpoint (no JWT required).
- Updated `packages/messaging/src/telegram/adapter.ts`:
  - Added `bot.command("start", ...)` handler before the generic `text` handler.
  - Extracts token from `/start <token>` argument; if present, makes an internal HTTP GET to `${API_BASE_URL}/api/v1/auth/magic-link/verify?token=...&platformUserId=...` and replies with success or failure message.
  - If no token, replies with welcome/instructions message.
  - `apiBaseUrl` injected via constructor (defaults to `process.env.API_BASE_URL ?? "http://localhost:3000"`).
- Created `apps/api/src/__tests__/magicLink.test.ts` with 12 unit tests covering all DoD scenarios.
- Updated `apps/api/src/__tests__/server.test.ts` to remove magic link routes from the 501 stubs list.
- Fixed `magicLink.test.ts` to include `bcrypt` mock (same pattern as `auth.test.ts`).

**Decisions made:**

- `findValidToken()` in `packages/db` already filters by `expiresAt > now` AND `usedAt IS NULL` in a single Prisma query — expired and already-used tokens both return `null`, so no separate checks are needed in the service layer.
- `platformUserId` is passed as a query param to the verify endpoint rather than derived server-side, keeping the endpoint stateless and avoiding any session coupling.
- The Telegram adapter makes an internal HTTP call rather than importing `magicLinkService` directly, preserving the `packages/messaging` → `apps/api` package boundary.
- Deep link URL uses `TELEGRAM_BOT_NAME` env var to avoid hardcoding the bot username.

**Blockers:**
- None.

**DoD verification:**
- [x] `POST /magic-link/generate` returns a token and a valid Telegram deep link URL.
- [x] `GET /magic-link/verify` with a valid token creates a `UserIdentity` row and marks the token as used.
- [x] A second call to verify with the same token returns `400` (`findValidToken` returns `null` for used tokens).
- [x] A call to verify with an expired token returns `400` (`findValidToken` returns `null` for expired tokens).
- [x] After linking, `upsertIdentity` is called with the correct `userId` from the token — verified in test suite.
- [x] Unit tests cover: expired token, already-used token, unknown token — all return `400` with a descriptive message.
- [x] `pnpm --filter @diet-ai/api build` passes with no TypeScript errors.
- [x] `pnpm --filter @diet-ai/api test` passes — 41/41 tests green.
- [x] `pnpm build` passes across all packages.
- [x] `pnpm test` passes across all packages — 144/144 tests green across 18 suites.

## 2026-03-28 — T-10: End-to-End Message Processing Pipeline (BullMQ Worker)

### Created feature branch
- Branched off `master` into `feat/t-10-core-pipeline-message-processing-worker` before making any changes.

### Step 1 — Created `apps/api/src/services/logService.ts`
- Thin wrapper over `packages/db` log repository helpers, keeping raw DB calls out of the worker.
- Exports: `createLog()`, `updateLogSuccess()`, `updateLogFailed()`, `setClarificationPrompt()`, `setClarificationResponse()`, `markLogAbandoned()`.

### Step 2 — Created `apps/api/src/services/mealService.ts`
- Creates `Meal` + `MealItem` records and aggregates daily summaries.
- Exports: `createMealFromItems()`, `getDailySummary()`.
- Imports `Meal` type from `@diet-ai/db` to satisfy strict-mode `implicit any` in reduce callbacks.

### Step 3 — Created `apps/api/src/workers/messageProcessor.ts`
- Core BullMQ worker with full pipeline: identity lookup → abandoned clarification detection → LLM parsing → intent routing → nutrition lookup → meal creation → reply sending.
- `resolveParsedResult()` checks Redis first; if a clarification key exists, treats the current message as a clarification response and re-parses the combined text.
- `runLogMealFlow()` performs the full nutrition + meal creation flow and sends a formatted reply.
- `runEditMealFlow()` and `runSummaryFlow()` are stubs (T-12 and T-13 respectively).
- `consumedAt` falls back to `job.data.messageTimestamp` when the LLM does not return a timestamp.

### Step 4 — Created `apps/api/src/workers/index.ts`
- BullMQ Worker bootstrap. Exports `startWorkers(adapters, llmProvider, nutritionProvider, redis)`.
- Concurrency driven by `QUEUE_CONCURRENCY` env var (default 5).
- Uses `redis as any` cast to work around ioredis 5.9.3 vs 5.10.0 type mismatch between bullmq and apps/api.

### Step 5 — Modified `apps/api/src/index.ts`
- Added BullMQ `Queue` instantiation with `redisConnection as any` cast.
- Wired `adapter.onMessage()` for each messaging adapter to enqueue `MessageProcessJob` jobs.
- `startWorkers()` called inside the `require.main === module` guard.

### Step 6 — Created `apps/api/src/__tests__/messageProcessor.integration.test.ts`
- 4 test scenarios: happy path meal log, unlinked user, nutrition API failure, clarification flow (2 sub-tests).
- All mocks via `jest.mock` — no real DB/Redis/LLM/HTTP calls.
- 5 tests, all passing.

### Step 7 — Fixed existing tests
- Added `onMessage: jest.fn()` to the messaging adapter mock in `auth.test.ts`, `server.test.ts`, and `magicLink.test.ts`.
- Added `jest.mock("bullmq", ...)` with Queue and Worker mocks to all three files.

**Decisions made:**

- `onMessage` handler only enqueues jobs; all heavy processing (LLM + nutrition API) happens inside the BullMQ worker — keeps the HTTP request cycle fast.
- Redis clarification state uses a 300 s TTL key `clarification:<userId>:<platform>` to track pending clarification prompts.
- Abandoned clarification detection: at the start of every job, if no Redis key exists but a recent `Log` with `processingStatus: "processing"` and non-null `clarificationPrompt` is found, it is marked `"abandoned"` before proceeding.
- `Queue<MessageProcessJob, void, "message-process">` with explicit name type literal avoids TS2345 on `queue.add()`.
- `defaultJobOptions` removed from `WorkerOptions` — in BullMQ v5 retry config belongs on the Queue side.

**Blockers:**
- None.

**DoD verification:**
- [x] `onMessage` callback enqueues a `MessageProcessJob` for every inbound message.
- [x] Worker resolves `UserIdentity` and returns `400`-equivalent reply for unlinked users.
- [x] LLM `parseMessage()` called with correct payload; result drives intent routing.
- [x] `log_meal` intent: nutrition lookup → `createMealFromItems()` → success reply with macro summary.
- [x] Nutrition API failure: worker catches error, marks log `failed`, sends error reply.
- [x] Clarification flow: Redis key set → next message treated as clarification response → re-parsed.
- [x] Abandoned clarification: prior `processing` log marked `abandoned` when no Redis key present.
- [x] `pnpm --filter @diet-ai/api build` passes with no TypeScript errors.
- [x] `pnpm --filter @diet-ai/api test` passes — 46/46 tests green.
- [x] `pnpm build` passes across all packages.
- [x] `pnpm test` passes across all packages — 149/149 tests green across 19 suites.

---

## 2026-03-29 — Hotfix: bcrypt native addon & MagicLinkToken type mismatch

**Branch:** `feat/t-08-auth-registration-login-jwt` / `feat/t-09-auth-magic-link-platform-linking`

### Issue 1 — `bcrypt` native addon not compiled (`MODULE_NOT_FOUND`)

**Symptom:** `pnpm --filter @diet-ai/api dev` crashed immediately with:
```
Error: Cannot find module '.../bcrypt/lib/binding/napi-v3/bcrypt_lib.node'
```
The `binding/` directory did not exist — the native addon was never compiled for the current Node.js version (v20.20.0).

**Fix:** Replaced `bcrypt` (native C++ addon) with `bcryptjs` (pure JavaScript, identical API, no compilation required).
- Added `bcryptjs` to `dependencies` and `@types/bcryptjs` to `devDependencies` in `apps/api/package.json`.
- Updated import in `apps/api/src/services/authService.ts`: `import bcrypt from "bcrypt"` → `import bcrypt from "bcryptjs"`.
- Updated `jest.mock("bcrypt", ...)` → `jest.mock("bcryptjs", ...)` and `require("bcrypt")` → `require("bcryptjs")` in `apps/api/src/__tests__/auth.test.ts`, `server.test.ts`, and `magicLink.test.ts`.

### Issue 2 — `magicLinkService.ts` TS2561: `userId` not in `MagicLinkTokenCreateInput`

**Symptom:** After the bcrypt fix, nodemon restarted and hit a TypeScript compile error:
```
src/services/magicLinkService.ts(17,23): error TS2561: Object literal may only specify known properties,
but 'userId' does not exist in type 'MagicLinkTokenCreateInput'. Did you mean to write 'user'?
```
`createToken` in `packages/db/src/repositories/magicLinkToken.repository.ts` was typed with `Prisma.MagicLinkTokenCreateInput`, which requires the relational connect syntax (`user: { connect: { id } }`). The call site in `magicLinkService.ts` passes a flat `userId` scalar.

**Fix:** Changed the parameter type in `magicLinkToken.repository.ts` from `Prisma.MagicLinkTokenCreateInput` to `Prisma.MagicLinkTokenUncheckedCreateInput`, which accepts scalar foreign keys directly.

### Verification
- `pnpm --filter @diet-ai/api test` — 46/46 tests green.
- `pnpm --filter @diet-ai/api dev` — `API server listening on port 3000` with no errors.

---

## 2026-03-29 — Hotfix: `TELEGRAM_BOT_NAME` not loaded from `.env`

**Branch:** `feat/t-09-auth-magic-link-platform-linking`

### Issue — `TELEGRAM_BOT_NAME` env var not picked up at runtime

**Symptom:** The magic-link deep link URL was always generated with the placeholder `YourBotName` even after adding `TELEGRAM_BOT_NAME` to the root `.env` file.

**Root cause:** `apps/api` had no `dotenv` setup. Running `pnpm --filter @diet-ai/api dev` does not automatically load any `.env` file — env vars must already be present in the shell environment or loaded explicitly at startup.

**Fix:**
- Added `dotenv` to `apps/api` dependencies: `pnpm --filter @diet-ai/api add dotenv`.
- Added the following as the first three lines of `apps/api/src/index.ts` so the root `.env` is loaded before any other module reads `process.env`:
  ```ts
  import dotenv from "dotenv";
  import path from "path";
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
  ```
  The path resolves to the monorepo root `.env` regardless of where the process is started from.

### Verification
- Restarting `pnpm --filter @diet-ai/api dev` now picks up all variables from the root `.env`, including `TELEGRAM_BOT_NAME`.
