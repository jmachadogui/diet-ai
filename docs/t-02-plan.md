# T-02 — Prisma Schema & Database Setup — Implementation Plan

**Task refs:** `tasks.md §T-02`
**Related docs:** `tdd.md §6.1`, `calorie_tracker_erd.md`

---

## Step 1 — Install Prisma dependencies in `packages/db`

- Add `prisma` as a dev dependency and `@prisma/client` as a runtime dependency in `packages/db/package.json`.
- Add a `postinstall` script `"prisma generate"` so the client is regenerated automatically after installs.
- Add the following scripts to `packages/db/package.json`:
  - `"db:migrate"` → `prisma migrate dev`
  - `"db:generate"` → `prisma generate`
  - `"db:studio"` → `prisma studio`
- Ensure `DATABASE_URL` is read from the environment (it will come from `.env` at the monorepo root via `dotenv-cli` or workspace-level `.env` resolution).

---

## Step 2 — Create the Prisma `datasource` and `generator` block

File: `packages/db/prisma/schema.prisma`

- Set `provider = "postgresql"` under `datasource db`.
- Set `url = env("DATABASE_URL")`.
- Set `provider = "prisma-client-js"` under `generator client`.
- Set `output = "../src/generated/client"` so the generated client lands inside the package's `src` tree and is importable via the package's own exports (keeps generated code co-located, avoids `node_modules` path confusion across the monorepo).

---

## Step 3 — Define the `User` model

Fields (derived from ERD + TDD §6.1):

```prisma
id                String    @id @default(uuid())
email             String    @unique
passwordHash      String
dailyCalorieGoal  Int?
weightKg          Float?
heightCm          Float?
age               Int?
sex               String?
activityLevel     String?
createdAt         DateTime  @default(now())
```

Relations (add after all scalar fields):
- `identities       UserIdentity[]`
- `magicLinkTokens  MagicLinkToken[]`
- `logs             Log[]`
- `meals            Meal[]`
- `weightHistory    UserWeightHistory[]`
- `editHistory      EditHistory[]`

Map to table name with `@@map("users")`.

---

## Step 4 — Define the `UserIdentity` model

Fields:

```prisma
id              String    @id @default(uuid())
userId          String
platform        String
platformUserId  String
linkedAt        DateTime  @default(now())
lastSeenAt      DateTime?
isPrimary       Boolean   @default(false)
```

Constraints & relations:
- `user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)`
- `@@unique([platform, platformUserId])` — enforces one platform identity per user per platform.
- `@@index([userId])` for fast per-user lookups.
- `@@map("user_identities")`

---

## Step 5 — Define the `MagicLinkToken` model

Fields:

```prisma
id           String    @id @default(uuid())
userId       String
platform     String
token        String    @unique
expiresAt    DateTime
usedAt       DateTime?
redirectUrl  String?
```

Constraints & relations:
- `user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)`
- `@@index([userId, platform])` — used when looking up pending tokens for a user+platform pair.
- `@@map("magic_link_tokens")`

---

## Step 6 — Define the `Log` model

Fields:

```prisma
id                    String    @id @default(uuid())
userId                String
platform              String
platformMessageId     String?
messageTimestamp      DateTime?
rawText               String
llmOutput             Json?
intent                String?
processingStatus      String
clarificationPrompt   String?
clarificationResponse String?
latencyMs             Int?
errorCode             String?
errorMessage          String?
createdAt             DateTime  @default(now())
```

Constraints & relations:
- `user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)`
- `meals       Meal[]`
- `editHistory EditHistory[]`
- `@@index([userId, createdAt])` — required by TDD §6.1 and DoD.
- `@@map("logs")`

---

## Step 7 — Define the `Meal` model

Fields:

```prisma
id              String    @id @default(uuid())
userId          String
sourceLogId     String?
occasion        String?
consumedAt      DateTime
createdAt       DateTime  @default(now())
totalCalories   Int?
totalProteinG   Float?
totalCarbsG     Float?
totalFatG       Float?
```

Constraints & relations:
- `user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)`
- `sourceLog   Log?         @relation(fields: [sourceLogId], references: [id])`
- `items       MealItem[]`
- `editHistory EditHistory[]`
- `@@index([userId, consumedAt])` — required by TDD §6.1 and DoD.
- `@@map("meals")`

---

## Step 8 — Define the `MealItem` model

Fields:

```prisma
id                   String  @id @default(uuid())
mealId               String
foodName             String
quantity             Float
unit                 String
weightG              Float?
calories             Int?
proteinG             Float?
carbsG               Float?
fatG                 Float?
nutritionApi         String?
apiRefId             String?
apiResponseSnapshot  Json?
resolutionConfidence String?
notes                String?
```

Relations:
- `meal  Meal  @relation(fields: [mealId], references: [id], onDelete: Cascade)`
- `@@map("meal_items")`

---

## Step 9 — Define the `ApiCache` model

Fields:

```prisma
id                  String   @id @default(uuid())
vendor              String
queryString         String
normalizedQueryHash String   @unique
nutritionData       Json
fetchedAt           DateTime @default(now())
expiresAt           DateTime
```

Constraints:
- `@@index([expiresAt])` — for efficient cache-eviction queries (TDD §6.1).
- `@@map("api_cache")`

No user relation; this is a standalone lookup cache.

---

## Step 10 — Define the `UserWeightHistory` model

Fields:

```prisma
id         String   @id @default(uuid())
userId     String
weightKg   Float
recordedAt DateTime @default(now())
source     String?
```

Relations:
- `user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)`
- `@@index([userId, recordedAt])`
- `@@map("user_weight_history")`

---

## Step 11 — Define the `EditHistory` model

Fields:

```prisma
id          String   @id @default(uuid())
userId      String
mealId      String
sourceLogId String?
editType    String
oldValue    Json?
newValue    Json?
changedAt   DateTime @default(now())
```

Relations:
- `user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)`
- `meal      Meal    @relation(fields: [mealId], references: [id], onDelete: Cascade)`
- `sourceLog Log?    @relation(fields: [sourceLogId], references: [id])`
- `@@index([userId, changedAt])`
- `@@map("edit_history")`

---

## Step 12 — Run the first migration

- Ensure PostgreSQL is running via `docker compose up -d` (from `infra/docker-compose.yml` created in T-01).
- Run `pnpm --filter @diet-ai/db db:migrate` with migration name `init`.
- Verify the migration file is generated under `packages/db/prisma/migrations/YYYYMMDDHHMMSS_init/migration.sql`.
- Commit the generated migration file — it must be tracked in version control.
- Run `pnpm --filter @diet-ai/db db:generate` to produce the typed Prisma client.

---

## Step 13 — Create the singleton Prisma client

File: `packages/db/src/client.ts`

- Instantiate `PrismaClient` once. In non-production environments, attach the instance to `globalThis` to survive hot-module reloads (standard Next.js/Node dev pattern):

```ts
import { PrismaClient } from './generated/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## Step 14 — Create repository helpers per entity

Create one file per entity under `packages/db/src/repositories/`:

**`user.repository.ts`**
- `createUser(data)` → `prisma.user.create(...)`
- `findUserByEmail(email)` → `prisma.user.findUnique(...)`
- `findUserById(id)` → `prisma.user.findUnique(...)`
- `updateUser(id, data)` → `prisma.user.update(...)`

**`userIdentity.repository.ts`**
- `upsertIdentity(data)` → `prisma.userIdentity.upsert(...)` keyed on `[platform, platformUserId]`
- `findIdentity(platform, platformUserId)` → `prisma.userIdentity.findUnique(...)`

**`magicLinkToken.repository.ts`**
- `createToken(data)` → `prisma.magicLinkToken.create(...)`
- `findValidToken(token)` → finds where `token` matches AND `expiresAt > now()` AND `usedAt == null`
- `markTokenUsed(id)` → `prisma.magicLinkToken.update({ data: { usedAt: new Date() } })`

**`log.repository.ts`**
- `createLog(data)` → `prisma.log.create(...)`
- `updateLog(id, data)` → `prisma.log.update(...)`
- `findLogsByUser(userId, options?: { from?: Date; to?: Date; limit?: number })` → with `orderBy: { createdAt: 'desc' }`

**`meal.repository.ts`**
- `createMealWithItems(mealData, items)` — wraps `prisma.$transaction` to create `Meal` and its `MealItem[]` atomically
- `findMealsByDay(userId, date)` → queries by `consumedAt` range for the full calendar day
- `findMealById(id)` → includes `items`
- `updateMealTotals(id, totals)` → updates aggregate calorie/macro fields
- `deleteMeal(id)` → cascade deletes items

**`mealItem.repository.ts`**
- `updateMealItem(id, data)` → `prisma.mealItem.update(...)`
- `deleteMealItem(id)` → `prisma.mealItem.delete(...)`
- `addMealItem(data)` → `prisma.mealItem.create(...)`

**`apiCache.repository.ts`**
- `findCache(normalizedQueryHash)` → returns cache row if `expiresAt > now()`, else `null`
- `upsertCache(data)` → `prisma.apiCache.upsert(...)` keyed on `normalizedQueryHash`

**`userWeightHistory.repository.ts`**
- `recordWeight(userId, weightKg, source?)` → `prisma.userWeightHistory.create(...)`
- `getWeightHistory(userId)` → `prisma.userWeightHistory.findMany(...)` ordered by `recordedAt desc`

**`editHistory.repository.ts`**
- `createEditHistory(data)` → `prisma.editHistory.create(...)`
- `findEditsByMeal(mealId)` → `prisma.editHistory.findMany(...)` ordered by `changedAt desc`

---

## Step 15 — Create the package barrel export

File: `packages/db/src/index.ts`

- Re-export `prisma` client from `./client`.
- Re-export all repository functions from each `./repositories/*` file.
- Re-export the generated Prisma types that callers will need (e.g., `User`, `Meal`, `MealItem`, etc.) via `export type { ... } from './generated/client'`.

---

## Step 16 — Write repository unit tests

File pattern: `packages/db/src/repositories/__tests__/*.test.ts`

- Use `jest` + `ts-jest` (configured in T-01).
- Mock the `prisma` client using `jest.mock` or a manual mock in `__mocks__` so tests do not require a live DB connection.
- For each repository, write at minimum:
  - A test that calls the helper with valid input and asserts the correct Prisma method was called with the correct arguments.
  - A test that verifies the return type matches the expected shape (compile-time check via TypeScript).
- Specific cases to cover:
  - `findValidToken`: returns `null` when token is expired or already used.
  - `findCache`: returns `null` when `expiresAt` is in the past.
  - `createMealWithItems`: calls `prisma.$transaction` and creates both `Meal` and `MealItem` records.

---

## Step 17 — Verify all DoD items

Run the following checks in order:

1. `docker compose -f infra/docker-compose.yml up -d` — PostgreSQL must be running.
2. `pnpm --filter @diet-ai/db db:migrate` — migration must apply with no errors.
3. `pnpm --filter @diet-ai/db db:generate` — client generation must complete with no TypeScript errors.
4. Connect via `psql $DATABASE_URL` (or `pnpm --filter @diet-ai/db db:studio`) and confirm all 9 tables exist with correct columns and constraints.
5. `pnpm build` from root — all packages must compile cleanly.
6. `pnpm test` from root — all repository unit tests must pass.
