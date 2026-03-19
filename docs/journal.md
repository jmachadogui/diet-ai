# Project Journal

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
