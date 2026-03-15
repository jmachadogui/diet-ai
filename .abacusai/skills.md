# Agent Skills

## Domain Skills (Nutrition & Diet)

- Calorie/macro data (protein, carbs, fat) always comes from `packages/nutrition` via `NutritionProvider` — never hardcode or estimate nutritional values.
- Treat `consumedAt` and `mealOccasion` as first-class fields; always preserve them when parsing or editing meal logs.
- Meal descriptions are free-form natural language — always route them through the LLM pipeline; never attempt regex or manual parsing.
- The system asks at most one clarifying question when a message is ambiguous (PRD FR-3). Do not add additional clarification loops.
- Quantity unit conversion (grams ↔ portions) is handled inside `packages/nutrition` normalization logic — do not duplicate this elsewhere.

## Tech Skills (Stack-specific)

- **Prisma:** all schema changes require `prisma migrate dev`. Never mutate the DB directly. Use repository helpers from `packages/db` instead of raw Prisma calls in service files.
- **BullMQ:** message processing is always async via a BullMQ job. Never call the LLM or nutrition API synchronously inside a webhook handler.
- **Zod:** `packages/shared` schemas are the single source of truth. Always use `z.infer<>` to derive TypeScript types; never duplicate type definitions manually.
- **Telegraf:** all Telegraf-specific code lives only in `packages/messaging`. Keep bot logic out of `apps/api` service files.
- **Next.js App Router:** use server components by default; add `"use client"` only when interactivity requires it.
- **pnpm workspaces:** scope commands with `pnpm --filter @diet-ai/<package>`. Never run package-local scripts from the root without `--filter`.

## Workflow Skills

- Read `docs/prd.md`, `docs/tdd.md`, and `docs/calorie_tracker_erd.md` before making architectural decisions or adding new features.
- Follow the interface-first pattern: define or update the interface in `packages/` before implementing any provider or adapter.
- When adding a new provider (LLM, nutrition, messaging), implement the existing interface — never modify the core pipeline to accommodate it.
- Run `pnpm build` and `pnpm test` after every non-trivial change to confirm no regressions.
- Respect the task dependency order in `docs/tasks.md`; do not implement a task whose dependencies are not yet complete.
- For bugs: write a failing test first, fix the bug, then verify the test passes.

## Integration Skills (External APIs)

- **AbacusAI RouteLLM:** all LLM calls go through `packages/llm`. Use the OpenAI-compatible SDK. Default model is `claude-sonnet-4-5`; override via env var. Never call the API directly from service files.
- **FatSecret:** all nutrition lookups go through `packages/nutrition`. OAuth 2.0 tokens are managed inside the provider — do not expose or pass them elsewhere. Results are normalized to per-gram before quantity scaling.
- **Telegram webhook:** registered exclusively via `TelegramAdapter.registerWebhook(app)`. Do not manually add Telegram routes to the Express app.
- All external API credentials come exclusively from environment variables (see `.env.example`). Never hardcode keys or secrets.
- Cache nutrition API responses in the `ApiCache` table keyed by `normalizedQueryHash` to avoid redundant external calls (`tdd.md §6.2`).
