# T-03 — `packages/shared` — Zod Schemas & Common Types — Implementation Plan

**Task refs:** `tasks.md §T-03`
**Related docs:** `tdd.md §5.1`, `tdd.md §5.2`, `tdd.md §5.3`, `tdd.md §5.5`, `prd.md §FR-5`, `prd.md §FR-13`
**Depends on:** T-01 (monorepo scaffolding)

---

## Overview

`packages/shared` is the single source of truth for all cross-package types. It has no runtime dependencies beyond `zod`. Every other package (`llm`, `nutrition`, `messaging`, `db`, `apps/api`, `apps/web`) imports from here. Getting the shapes exactly right at this stage prevents ripple-effect type errors later.

The task covers:
1. Package setup (dependencies, exports).
2. Enum schemas.
3. Messaging schemas (`IncomingMessageSchema`, `OutgoingMessageSchema`).
4. LLM output schemas (`MealParseResultSchema`, `EditInstructionSchema`).
5. Nutrition schemas (`NutritionQuerySchema`, `NutritionResultSchema`).
6. Barrel export.
7. Unit tests for every schema.

---

## Step 1 — Confirm `packages/shared` package setup

File: `packages/shared/package.json`

- Ensure `name` is `"@diet-ai/shared"`.
- Ensure `zod` is listed as a runtime dependency (not dev-only — consumers import types at runtime).
- Ensure `main` points to the compiled output (`dist/index.js`) and `types` to `dist/index.d.ts`.
- Add a `build` script: `"tsc --project tsconfig.json"`.
- No other runtime dependencies should be present. This package must stay dependency-light.

File: `packages/shared/tsconfig.json`

- Extends `../../tsconfig.base.json`.
- Sets `outDir` to `"./dist"` and `rootDir` to `"./src"`.
- Includes only `"src/**/*"`.

---

## Step 2 — Define `PlatformEnum`

File: `packages/shared/src/enums.ts`

This enum is referenced by both messaging and LLM schemas, so it must be defined first.

```typescript
export const PlatformEnum = z.enum(["telegram", "whatsapp", "discord"]);
export type Platform = z.infer<typeof PlatformEnum>;
```

Values align with the `platform` column used across `UserIdentity`, `MagicLinkToken`, `Log`, and the messaging adapter interface (`tdd.md §5.1`).

---

## Step 3 — Define `MealOccasionEnum` and `IntentEnum`

File: `packages/shared/src/enums.ts` (same file as Step 2)

**`MealOccasionEnum`** — derived from the LLM parse output schema (`tdd.md §5.5.1`) and the `LLMParseResult` interface (`tdd.md §5.2`):

```typescript
export const MealOccasionEnum = z.enum([
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "unknown",
]);
export type MealOccasion = z.infer<typeof MealOccasionEnum>;
```

**`IntentEnum`** — derived from the same sources:

```typescript
export const IntentEnum = z.enum([
  "log_meal",
  "edit_meal",
  "summary",
  "other",
]);
export type Intent = z.infer<typeof IntentEnum>;
```

Both enums are used in `MealParseResultSchema` and downstream in the API service layer for routing logic.

---

## Step 4 — Define `IncomingMessageSchema` and `OutgoingMessageSchema`

File: `packages/shared/src/messaging.ts`

These mirror the `IncomingMessage` and `OutgoingMessage` interfaces in `tdd.md §5.1`. Defining them as Zod schemas here (rather than plain interfaces in `packages/messaging`) means the API worker can validate raw job payloads at runtime, not just at the TypeScript level.

**`IncomingMessageSchema`:**

```typescript
export const IncomingMessageSchema = z.object({
  platformMessageId: z.string(),
  platformUserId: z.string(),
  platform: PlatformEnum,
  text: z.string(),
  timestamp: z.coerce.date(),
});
export type IncomingMessage = z.infer<typeof IncomingMessageSchema>;
```

Notes:
- `z.coerce.date()` handles both `Date` objects and ISO string timestamps that arrive from the BullMQ job queue (serialised as JSON strings).
- `platform` reuses `PlatformEnum` from Step 2.

**`OutgoingMessageSchema`:**

```typescript
export const OutgoingMessageSchema = z.object({
  platformUserId: z.string(),
  platform: PlatformEnum,
  text: z.string(),
});
export type OutgoingMessage = z.infer<typeof OutgoingMessageSchema>;
```

---

## Step 5 — Define `MealParseResultSchema`

File: `packages/shared/src/llm.ts`

This is the most important schema in this package. It is the contract between the LLM provider (`packages/llm`) and the API worker. It must match the JSON output schema defined in the parsing system prompt (`tdd.md §5.5.1`) exactly.

**`MealItemSchema`** (nested, also exported for use in edit schemas):

```typescript
export const MealItemSchema = z.object({
  food_name: z.string(),
  quantity: z.number().positive(),
  unit: z.enum([
    "g", "ml", "oz", "cup", "tbsp", "tsp",
    "slice", "piece", "serving", "unit",
  ]),
});
export type MealItem = z.infer<typeof MealItemSchema>;
```

**`MealParseResultSchema`:**

```typescript
export const MealParseResultSchema = z.object({
  intent: IntentEnum,
  needs_clarification: z.boolean(),
  clarification_question: z.string().nullable(),
  meal_occasion: MealOccasionEnum,
  consumed_at: z.string().datetime({ offset: true }).nullable(),
  items: z.array(MealItemSchema),
});
export type MealParseResult = z.infer<typeof MealParseResultSchema>;
```

Key decisions:
- `consumed_at` is `z.string().datetime({ offset: true }).nullable()` — kept as a string to preserve timezone offset information; the API worker coerces to `Date` before writing to the DB. Matching the prompt's spec of "ISO8601 datetime string | null".
- `clarification_question` must be `null` (not `undefined`) when `needs_clarification` is `false`. The prompt explicitly requires this; the schema enforces it structurally.
- `items` is always an array — empty array when intent is not `"log_meal"`, as required by the prompt rules.

Cross-field refinement (add via `.superRefine()`):
- When `needs_clarification` is `true`, `clarification_question` must not be null.
- When `needs_clarification` is `false`, `clarification_question` must be null.

This catches LLM responses that set the flag correctly but forget (or fail) to populate the corresponding field.

---

## Step 6 — Define `EditInstructionSchema`

File: `packages/shared/src/llm.ts` (same file as Step 5)

Mirrors the edit output schema from `tdd.md §5.5.2`.

**`EditOperationSchema`** (nested, also exported):

```typescript
export const EditOperationSchema = z.object({
  type: z.enum(["remove_item", "update_quantity", "add_item"]),
  item_ref: z.string().nullable(),
  new_quantity: z.number().positive().nullable(),
  new_unit: z.string().nullable(),
  food_name: z.string().nullable(),
});
export type EditOperation = z.infer<typeof EditOperationSchema>;
```

**`EditInstructionSchema`:**

```typescript
export const EditInstructionSchema = z.object({
  intent: z.literal("edit_meal"),
  target_meal_id: z.string().nullable(),
  target_occasion: MealOccasionEnum.exclude(["unknown"]).nullable(),
  target_date: z.string().nullable(),
  operations: z.array(EditOperationSchema).min(1),
  needs_clarification: z.boolean(),
  clarification_question: z.string().nullable(),
});
export type EditInstruction = z.infer<typeof EditInstructionSchema>;
```

Key decisions:
- `intent` is `z.literal("edit_meal")` — the editing prompt always returns this exact string; using a literal catches any case where the LLM accidentally returns a different intent.
- `target_occasion` excludes `"unknown"` — the edit prompt lists only `breakfast | lunch | dinner | snack | null`, not `unknown`.
- `operations` has `.min(1)` — an edit instruction with zero operations is meaningless and indicates a malformed LLM response.
- Same `needs_clarification` / `clarification_question` cross-field refinement as `MealParseResultSchema`.

---

## Step 7 — Define `NutritionQuerySchema` and `NutritionResultSchema`

File: `packages/shared/src/nutrition.ts`

These mirror the `NutritionQuery` and `NutritionResult` interfaces in `tdd.md §5.3`. Moving them to `packages/shared` (rather than defining them only in `packages/nutrition`) allows `apps/api` service layer to type-check calls without importing from `packages/nutrition`.

**`NutritionQuerySchema`:**

```typescript
export const NutritionQuerySchema = z.object({
  food_name: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().min(1),
});
export type NutritionQuery = z.infer<typeof NutritionQuerySchema>;
```

**`NutritionResultSchema`:**

```typescript
export const NutritionResultSchema = z.object({
  food_name: z.string(),
  api_ref_id: z.string(),
  calories: z.number().nonnegative(),
  protein_g: z.number().nonnegative(),
  carbs_g: z.number().nonnegative(),
  fat_g: z.number().nonnegative(),
  api_response_snapshot: z.record(z.unknown()),
  resolution_confidence: z.enum(["high", "medium", "low"]),
});
export type NutritionResult = z.infer<typeof NutritionResultSchema>;
```

Notes:
- Macro fields use `.nonnegative()` rather than `.positive()` — zero is a valid value (e.g. plain water).
- `api_response_snapshot` maps to `Record<string, unknown>` which is the Zod equivalent of the interface's `Record<string, unknown>`.

---

## Step 8 — Barrel export

File: `packages/shared/src/index.ts`

Re-export everything from each module file:

```typescript
export * from "./enums";
export * from "./messaging";
export * from "./llm";
export * from "./nutrition";
```

All consumers import from `"@diet-ai/shared"` — they never reach into sub-paths. This keeps internal file organisation flexible.

---

## Step 9 — Unit tests

File: `packages/shared/src/__tests__/enums.test.ts`

For each enum schema (`PlatformEnum`, `MealOccasionEnum`, `IntentEnum`):
- Valid value → `.safeParse()` returns `success: true`.
- Invalid string (e.g. `"sms"`, `"brunch"`, `"delete"`) → `success: false`.

File: `packages/shared/src/__tests__/messaging.test.ts`

**`IncomingMessageSchema`:**
- Valid object with a `Date` for `timestamp` → succeeds.
- Valid object with an ISO string for `timestamp` → succeeds (coercion).
- Missing `platformMessageId` → fails.
- Invalid `platform` value → fails.

**`OutgoingMessageSchema`:**
- Valid object → succeeds.
- Missing `text` → fails.

File: `packages/shared/src/__tests__/llm.test.ts`

**`MealParseResultSchema`:**
- Valid `log_meal` result with items → succeeds.
- Valid `summary` result with empty items → succeeds.
- `needs_clarification: true` with non-null `clarification_question` → succeeds.
- `needs_clarification: true` with `null` `clarification_question` → fails (superRefine).
- `needs_clarification: false` with non-null `clarification_question` → fails (superRefine).
- Missing `intent` field → fails.
- Item with invalid `unit` (e.g. `"litre"`) → fails.
- Item with non-positive `quantity` (e.g. `0`) → fails.

**`EditInstructionSchema`:**
- Valid edit with one `remove_item` operation → succeeds.
- Valid edit with multiple mixed operations → succeeds.
- Empty `operations` array → fails.
- `intent` value other than `"edit_meal"` → fails.
- `target_occasion: "unknown"` → fails.
- `needs_clarification` / `clarification_question` cross-field violations → fails.

File: `packages/shared/src/__tests__/nutrition.test.ts`

**`NutritionQuerySchema`:**
- Valid query → succeeds.
- Empty `food_name` → fails.
- Negative `quantity` → fails.

**`NutritionResultSchema`:**
- Valid result with all macro fields as `0` → succeeds (nonnegative allows zero).
- Negative `calories` → fails.
- Invalid `resolution_confidence` value → fails.

---

## Definition of Done Checklist

- [ ] All schemas compile with no TypeScript errors (`pnpm build` from root passes).
- [ ] Each schema has at least one passing valid-input test and one failing invalid-input test (`pnpm test` passes).
- [ ] Inferred types are exported and importable in a sibling package without type errors.
- [ ] `packages/shared` has no runtime dependencies other than `zod`.
- [ ] The `needs_clarification` / `clarification_question` cross-field constraint is enforced by `superRefine` and covered by tests in both `MealParseResultSchema` and `EditInstructionSchema`.
