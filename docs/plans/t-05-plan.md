# T-05 — `packages/nutrition` — Nutrition Provider Abstraction & FatSecret Implementation — Implementation Plan

**Task refs:** `tasks.md §T-05`
**Related docs:** `tdd.md §5.3`, `tdd.md §6.2`, `prd.md §FR-8`, `prd.md §FR-9`, `prd.md §FR-9a`, `prd.md §FR-10`, `prd.md §FR-10b`
**Depends on:** T-03 (packages/shared Zod schemas — already completed)

---

## Overview

`packages/nutrition` provides the nutrition API abstraction layer. The core deliverables are:

1. `NutritionProvider` interface + `NutritionAPIError` (`provider.ts`)
2. `FatSecretProvider` implementation:
   - OAuth 2.0 Client Credentials token fetch with in-memory cache
   - `foods.search` call to find a food by name
   - `food.get` call to retrieve full nutritional data
   - Per-gram normalization from FatSecret serving data, scaled to user quantity + unit
3. Cache layer: check `ApiCache` DB table before calling FatSecret; write on miss
4. Provider factory reading `NUTRITION_PROVIDER` env var (`factory.ts`)
5. Barrel export (`index.ts`)
6. Unit tests covering all DoD cases

The package already has its `package.json` (with `axios` and `@diet-ai/shared` deps) and a stub `src/index.ts`. All implementation goes into new files under `packages/nutrition/src/`.

**Note on `@diet-ai/db`:** The cache layer requires access to the `ApiCache` table. The `FatSecretProvider` will accept a `prisma` client instance via its constructor (dependency injection) so the package does not import `@diet-ai/db` directly — this avoids a circular dependency and keeps the package independently testable.

---

## Step 1 — Define the `NutritionProvider` interface and `NutritionAPIError`

**File:** `packages/nutrition/src/provider.ts`

The interface mirrors `tdd.md §5.3` exactly. `NutritionQuery` and `NutritionResult` are **not** re-defined here — they are imported from `@diet-ai/shared`.

```typescript
import type { NutritionQuery, NutritionResult } from "@diet-ai/shared";

export type { NutritionQuery, NutritionResult };

export interface NutritionProvider {
  vendorName: string;
  lookup(query: NutritionQuery): Promise<NutritionResult>;
}

export class NutritionAPIError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "NutritionAPIError";
  }
}
```

**Design notes:**
- `NutritionAPIError` is thrown when FatSecret is unreachable or returns an unexpected HTTP error. BullMQ retries on this error type.
- Food-not-found is **not** an error — it returns a `NutritionResult` with `resolution_confidence: "low"` and zeroed macros (see Step 3).
- The `prisma` client is injected via the constructor, not imported at module level, so unit tests can pass a mock without any DB setup.

---

## Step 2 — Define the OAuth token manager

**File:** `packages/nutrition/src/fatsecret/tokenManager.ts`

FatSecret uses OAuth 2.0 Client Credentials. The token must be fetched once and reused until it expires. This logic is isolated in its own module for clarity and testability.

**Token cache shape (in-memory):**

```typescript
interface TokenCache {
  accessToken: string;
  expiresAt: number; // Unix timestamp ms
}
```

**`getAccessToken(clientId, clientSecret)` function:**

1. If `tokenCache` is set and `Date.now() < tokenCache.expiresAt - 60_000` (60s buffer), return `tokenCache.accessToken`.
2. Otherwise POST to `https://oauth.fatsecret.com/connect/token`:
   - Body (form-encoded): `grant_type=client_credentials&scope=basic`
   - Auth: HTTP Basic with `clientId:clientSecret` (Base64-encoded `Authorization: Basic ...` header).
3. Parse response: `{ access_token, expires_in }`.
4. Store `{ accessToken: access_token, expiresAt: Date.now() + expires_in * 1000 }` in the module-level cache variable.
5. Return `accessToken`.
6. On HTTP error: throw `NutritionAPIError("Failed to obtain FatSecret OAuth token", err)`.

**Design notes:**
- The 60-second buffer prevents using a token that expires mid-request.
- The cache variable is module-level (singleton per process). This is safe because the token is not user-specific.
- `axios` is used for all HTTP calls (already in `package.json`).

---

## Step 3 — Implement the normalization helper

**File:** `packages/nutrition/src/fatsecret/normalize.ts`

This is the most logic-dense part of the implementation. FatSecret returns nutrition data per serving (e.g. "per 100g", "per 1 cup"). We must normalize to per-gram, then scale to the user's requested quantity.

### Unit conversion table

```typescript
const UNIT_TO_GRAMS: Record<string, number> = {
  g:       1,
  oz:      28.3495,
  cup:     240,
  tbsp:    15,
  tsp:     5,
  ml:      1,       // approximate: 1ml water ≈ 1g; good enough for MVP
  slice:   30,      // generic fallback
  piece:   100,     // generic fallback
  serving: null,    // handled separately — use FatSecret's serving_size_g directly
  unit:    null,    // handled separately — use FatSecret's serving_size_g directly
};
```

### `normalizeServing(food: FatSecretFood, query: NutritionQuery): NutritionResult`

**FatSecret serving data fields used:**
- `serving_size` — numeric amount (e.g. `"100"`)
- `metric_serving_amount` — grams of the serving (e.g. `"100"`)
- `metric_serving_unit` — always `"g"` for weight-based servings
- `calories`, `protein`, `carbohydrate`, `fat` — per-serving values

**Algorithm:**

1. Parse `metric_serving_amount` as a float → `servingGrams`. If missing or zero, fall back to `parseFloat(serving_size)` (treat as grams).
2. Compute per-gram macros:
   ```
   caloriesPerGram  = calories  / servingGrams
   proteinPerGram   = protein   / servingGrams
   carbsPerGram     = carbohydrate / servingGrams
   fatPerGram       = fat       / servingGrams
   ```
3. Resolve the user's quantity in grams:
   - If `query.unit` is `"g"` or `"ml"`: `userGrams = query.quantity`
   - If `query.unit` is `"oz"`, `"cup"`, etc.: `userGrams = query.quantity * UNIT_TO_GRAMS[query.unit]`
   - If `query.unit` is `"serving"` or `"unit"`: `userGrams = query.quantity * servingGrams`
4. Scale macros:
   ```
   calories  = Math.round(caloriesPerGram * userGrams)
   protein_g = parseFloat((proteinPerGram * userGrams).toFixed(2))
   carbs_g   = parseFloat((carbsPerGram   * userGrams).toFixed(2))
   fat_g     = parseFloat((fatPerGram     * userGrams).toFixed(2))
   ```
5. Return `NutritionResult`:
   ```typescript
   {
     food_name: query.food_name,
     api_ref_id: food.food_id,
     calories,
     protein_g,
     carbs_g,
     fat_g,
     api_response_snapshot: food as Record<string, unknown>,
     resolution_confidence: "high",
   }
   ```

**Food-not-found result** (returned when `foods.search` returns no results):

```typescript
{
  food_name: query.food_name,
  api_ref_id: "",
  calories: 0,
  protein_g: 0,
  carbs_g: 0,
  fat_g: 0,
  api_response_snapshot: {},
  resolution_confidence: "low",
}
```

---

## Step 4 — Implement the cache key helper

**File:** `packages/nutrition/src/fatsecret/cacheKey.ts`

Per `tdd.md §6.2`, the cache key is:

```
SHA-256 of lowercase(trim(food_name)) + "|" + normalized_unit
```

```typescript
import { createHash } from "crypto";

export function computeNormalizedQueryHash(food_name: string, unit: string): string {
  const normalized = `${food_name.toLowerCase().trim()}|${unit.toLowerCase().trim()}`;
  return createHash("sha256").update(normalized).digest("hex");
}
```

**Design notes:**
- Uses Node's built-in `crypto` module — no extra dependency.
- The hash is deterministic: same food name + unit always produces the same key regardless of casing or surrounding whitespace.
- `quantity` is intentionally excluded from the hash: cached nutrition data is per-gram; scaling is applied at read time. This maximises cache hit rate.

---

## Step 5 — Implement `FatSecretProvider`

**File:** `packages/nutrition/src/fatsecret/provider.ts`

### Constructor

```typescript
import type { PrismaClient } from "@prisma/client";
import type { NutritionProvider, NutritionQuery, NutritionResult } from "../provider";

export class FatSecretProvider implements NutritionProvider {
  readonly vendorName = "fatsecret";

  constructor(
    private readonly prisma: PrismaClient,
    private readonly clientId: string = process.env.FATSECRET_CLIENT_ID ?? "",
    private readonly clientSecret: string = process.env.FATSECRET_CLIENT_SECRET ?? "",
    private readonly cacheTtlDays: number = parseInt(process.env.NUTRITION_CACHE_TTL_DAYS ?? "7", 10)
  ) {}
  ...
}
```

Accepting `prisma`, `clientId`, `clientSecret`, and `cacheTtlDays` as constructor parameters makes the class fully injectable and testable without environment variables or a real DB.

### `lookup(query: NutritionQuery): Promise<NutritionResult>`

Full flow per `tdd.md §5.3`:

**1. Check cache**

```typescript
const hash = computeNormalizedQueryHash(query.food_name, query.unit);
const cached = await this.prisma.apiCache.findUnique({
  where: { normalizedQueryHash: hash },
});
if (cached && cached.expiresAt > new Date()) {
  return cached.nutritionData as NutritionResult;
}
```

**2. Obtain OAuth token**

```typescript
const token = await getAccessToken(this.clientId, this.clientSecret);
```

**3. Call `foods.search`**

```
GET https://platform.fatsecret.com/rest/server.api
  ?method=foods.search
  &search_expression=<food_name>
  &format=json
  &max_results=1
Authorization: Bearer <token>
```

- If response has no `foods.food` array or it is empty → return the food-not-found result (zeroed macros, `resolution_confidence: "low"`). Do **not** throw.

**4. Call `food.get`**

```
GET https://platform.fatsecret.com/rest/server.api
  ?method=food.get
  &food_id=<food_id>
  &format=json
Authorization: Bearer <token>
```

- Extract the first serving from `food.servings.serving` (may be an array or a single object — handle both).
- Pass the serving object to `normalizeServing(serving, query)` to get the `NutritionResult`.

**5. Write to cache**

```typescript
const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + this.cacheTtlDays);

await this.prisma.apiCache.upsert({
  where: { normalizedQueryHash: hash },
  update: { nutritionData: result, fetchedAt: new Date(), expiresAt },
  create: {
    vendor: this.vendorName,
    queryString: query.food_name,
    normalizedQueryHash: hash,
    nutritionData: result,
    fetchedAt: new Date(),
    expiresAt,
  },
});
```

**6. Return result**

**Error handling:**
- Any `axios` error with a non-2xx status from FatSecret → throw `NutritionAPIError("FatSecret API error: <status>", err)`.
- Network-level errors (ECONNREFUSED, timeout) → throw `NutritionAPIError("FatSecret unreachable", err)`.
- OAuth token fetch failure → `NutritionAPIError` already thrown by `tokenManager`.

---

## Step 6 — Implement provider factory

**File:** `packages/nutrition/src/factory.ts`

```typescript
import type { PrismaClient } from "@prisma/client";
import { FatSecretProvider } from "./fatsecret/provider";
import type { NutritionProvider } from "./provider";

export function createNutritionProvider(prisma: PrismaClient): NutritionProvider {
  const provider = process.env.NUTRITION_PROVIDER ?? "fatsecret";
  if (provider === "fatsecret") {
    return new FatSecretProvider(prisma);
  }
  throw new Error(`Unknown NUTRITION_PROVIDER: "${provider}"`);
}
```

**Design notes:**
- `prisma` is passed in from the caller (`apps/api`) rather than imported here. This keeps `packages/nutrition` free of a hard dependency on `packages/db` and makes the factory testable.
- Throws a descriptive error for unknown values — surfaces misconfiguration at startup.

---

## Step 7 — Update barrel export

**File:** `packages/nutrition/src/index.ts`

```typescript
export * from "./provider";
export * from "./factory";
export { FatSecretProvider } from "./fatsecret/provider";
export { computeNormalizedQueryHash } from "./fatsecret/cacheKey";
```

---

## Step 8 — Unit tests

### `packages/nutrition/src/__tests__/normalize.test.ts`

Tests for `normalizeServing` — pure function, no mocks needed.

**Test cases:**

1. **200g item with a per-100g serving → doubled macro values**
   - Serving: `{ metric_serving_amount: "100", calories: "200", protein: "30", carbohydrate: "0", fat: "10" }`
   - Query: `{ food_name: "chicken", quantity: 200, unit: "g" }`
   - Expected: `{ calories: 400, protein_g: 60, carbs_g: 0, fat_g: 20 }`

2. **1 oz item → correct gram conversion (28.3495g)**
   - Serving: per-100g data
   - Query: `{ quantity: 1, unit: "oz" }`
   - Expected: macros scaled to ~28.35g

3. **1 serving → uses serving's own gram weight**
   - Serving: `{ metric_serving_amount: "150", calories: "300", ... }`
   - Query: `{ quantity: 1, unit: "serving" }`
   - Expected: macros equal to the serving's values (1× scale)

4. **2 servings → doubled serving values**
   - Same serving as above, `quantity: 2`
   - Expected: macros doubled

5. **Missing `metric_serving_amount` → falls back to `serving_size`**
   - Serving: `{ serving_size: "100", calories: "150", protein: "10", carbohydrate: "20", fat: "5" }` (no `metric_serving_amount`)
   - Query: `{ quantity: 100, unit: "g" }`
   - Expected: macros equal to serving values

### `packages/nutrition/src/__tests__/cacheKey.test.ts`

Tests for `computeNormalizedQueryHash` — pure function, no mocks needed.

**Test cases:**

1. **Same food name regardless of casing → same hash**
   - `computeNormalizedQueryHash("Chicken", "g")` === `computeNormalizedQueryHash("chicken", "g")`

2. **Same food name with extra whitespace → same hash**
   - `computeNormalizedQueryHash("  chicken  ", "g")` === `computeNormalizedQueryHash("chicken", "g")`

3. **Different food names → different hashes**
   - `computeNormalizedQueryHash("chicken", "g")` !== `computeNormalizedQueryHash("beef", "g")`

4. **Same food name, different unit → different hashes**
   - `computeNormalizedQueryHash("chicken", "g")` !== `computeNormalizedQueryHash("chicken", "oz")`

### `packages/nutrition/src/__tests__/fatsecret.test.ts`

Tests for `FatSecretProvider.lookup()`. All external calls are mocked via `jest.spyOn` on `axios` or by injecting a mock `axios` instance. The `prisma` client is a Jest mock object.

**Mock setup:**

```typescript
const mockPrisma = {
  apiCache: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
  },
} as unknown as PrismaClient;
```

**Test cases:**

1. **Cache hit → FatSecret API is never called**
   - `mockPrisma.apiCache.findUnique` returns a valid cached entry with `expiresAt` in the future.
   - Assert: `axios.get` is never called; returned result matches cached `nutritionData`.

2. **Cache miss → FatSecret API called, result written to cache**
   - `mockPrisma.apiCache.findUnique` returns `null`.
   - Mock `getAccessToken` to return `"fake-token"`.
   - Mock `axios.get` for `foods.search` → returns one food result.
   - Mock `axios.get` for `food.get` → returns serving data.
   - Assert: `mockPrisma.apiCache.upsert` called once with correct hash and result.
   - Assert: returned `NutritionResult` has `resolution_confidence: "high"`.

3. **FatSecret unavailable → `NutritionAPIError` thrown**
   - `mockPrisma.apiCache.findUnique` returns `null`.
   - Mock `axios.get` to throw a network error.
   - Assert: `NutritionAPIError` is thrown.

4. **Food not found → `resolution_confidence: "low"` returned with zeroed macros**
   - `mockPrisma.apiCache.findUnique` returns `null`.
   - Mock `foods.search` response: `{ foods: {} }` (no results).
   - Assert: returned result has `resolution_confidence: "low"`, all macro values are `0`.
   - Assert: `mockPrisma.apiCache.upsert` is **not** called (no point caching a not-found result).

5. **Quantity scaling: 200g item with a per-100g serving returns doubled macro values**
   - End-to-end through `FatSecretProvider.lookup()` with mocked HTTP.
   - Query: `{ food_name: "chicken", quantity: 200, unit: "g" }`.
   - FatSecret serving: per-100g with known macro values.
   - Assert: returned macros are exactly 2× the per-100g values.

### `packages/nutrition/src/__tests__/tokenManager.test.ts`

**Test cases:**

1. **Token fetched on first call**
   - Mock `axios.post` to return `{ access_token: "tok1", expires_in: 3600 }`.
   - Call `getAccessToken(id, secret)` → returns `"tok1"`.
   - Assert: `axios.post` called once.

2. **Token reused on second call within expiry window**
   - Call `getAccessToken` twice in quick succession.
   - Assert: `axios.post` called only once.

3. **Token refreshed after expiry**
   - Manually set the module-level cache to an expired token (mock `Date.now`).
   - Call `getAccessToken` → assert `axios.post` called again.

4. **OAuth endpoint returns error → `NutritionAPIError` thrown**
   - Mock `axios.post` to throw an HTTP 401 error.
   - Assert: `NutritionAPIError` thrown.

### `packages/nutrition/src/__tests__/factory.test.ts`

1. `NUTRITION_PROVIDER=fatsecret` (or unset) → returns a `FatSecretProvider` instance.
2. `NUTRITION_PROVIDER=unknown` → throws with a message referencing the invalid value.

---

## Step 9 — Build & test verification

Run from the repo root:

```bash
pnpm --filter @diet-ai/nutrition build
pnpm --filter @diet-ai/nutrition test
```

Both must exit cleanly before the task is considered done.

---

## File map summary

```
packages/nutrition/src/
├── index.ts                          (update barrel export)
├── provider.ts                       (NutritionProvider interface + NutritionAPIError)
├── factory.ts                        (createNutritionProvider)
├── fatsecret/
│   ├── provider.ts                   (FatSecretProvider class)
│   ├── tokenManager.ts               (OAuth 2.0 token fetch + in-memory cache)
│   ├── normalize.ts                  (per-gram normalization + quantity scaling)
│   └── cacheKey.ts                   (SHA-256 normalizedQueryHash)
└── __tests__/
    ├── fatsecret.test.ts             (FatSecretProvider unit tests)
    ├── normalize.test.ts             (normalization math tests)
    ├── cacheKey.test.ts              (hash determinism tests)
    ├── tokenManager.test.ts          (OAuth token lifecycle tests)
    └── factory.test.ts               (factory env var tests)
```

---

## Definition of Done Checklist

- [ ] `FatSecretProvider.lookup({ food_name: "grilled chicken", quantity: 200, unit: "g" })` returns correct macro values (manual smoke test with real credentials).
- [ ] Unit tests with mocked HTTP cover: cache hit, cache miss + write, FatSecret unavailable, food not found, quantity scaling (200g / per-100g serving).
- [ ] OAuth token is fetched once and reused until expiry.
- [ ] `normalizedQueryHash` is computed consistently for the same food name regardless of casing or extra whitespace.
- [ ] Provider factory returns `FatSecretProvider` when `NUTRITION_PROVIDER=fatsecret`.
- [ ] `pnpm --filter @diet-ai/nutrition build` passes with no TypeScript errors.
- [ ] `pnpm --filter @diet-ai/nutrition test` passes with all tests green.
