This file is the primary constraint for all AI interactions. Before performing any task, verify your plan against the rules defined here and the dependencies in docs/tasks.md.

# Agent Instructions

Read this file before every prompt. No exceptions.

## Design Documents

All project design documents live in `docs/`. Always read them before making architectural decisions or adding new features.

- `docs/prd.md` — Product Requirements Document. Source of truth for features, user stories, functional and non-functional requirements, and acceptance criteria.
- `docs/calorie_tracker_erd.md` — Entity-Relationship Diagram. Source of truth for data models, relationships, and database design decisions.
- `docs/tdd.md` — Technical Design Document. Source of truth for tech stack, repository structure, abstraction interfaces, system prompts, API design, and all implementation decisions.
- `docs/tasks.md` — Roadmap document. Source of truth for all tasks that need to be implemented, along with dependencies and relevant references from prd and tdd.
- `docs/journal.md` — Implementation journal. Running log of everything done per task: steps taken, blockers encountered, decisions made, and DoD verification results. Always append a new dated entry after completing or partially completing a task.
- `docs/plans/` — Implementation plans directory. Contains one detailed step-by-step plan per task (e.g., `t-02-plan.md`). Before implementing a task, check if a plan exists here and follow it. If no plan exists, create one before starting implementation.

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Backend:** Node.js + Express
- **Frontend:** Next.js (App Router)
- **Database:** PostgreSQL via Prisma ORM
- **Queue:** BullMQ + Redis
- **LLM:** AbacusAI RouteLLM API (OpenAI-compatible SDK, model `claude-sonnet-4-5`)
- **Nutrition API:** FatSecret (OAuth 2.0)
- **Telegram bot:** Telegraf
- **Validation:** Zod (shared schemas across all packages)
- **Testing:** Jest + ts-jest

## Code Conventions

- No comments unless logic is non-obvious.
- No docstrings on functions unless explicitly requested.
- Prefer editing existing files over creating new ones.
- All packages follow the interface-first pattern defined in `docs/tdd.md` §5.
- Never hardcode API keys or secrets — always read from environment variables.
- Zod schemas are the single source of truth for all data shapes; do not duplicate type definitions manually.

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

## Git Workflow

- Always work on a feature branch named `feat/<task-id>-<short-description>` branched off `master`. Never commit directly to `master` or `main`.
- After completing an implementation, stage all relevant files and create a single atomic commit that covers the full change — never split a logical unit of work across multiple commits unless explicitly asked.
- Commit messages must follow Conventional Commits: `<type>(<scope>): <short summary>` on the first line, followed by a bullet-point body listing every meaningful change.
- Always append `Co-Authored-By: Abacus.AI CLI <agent@abacus.ai>` to every commit message.
- After committing, push the branch and open a Pull Request against `master` using `gh pr create`. The PR description must include:
  - A **Summary** section explaining what task is being completed and which docs it references.
  - A **What changed** section with a breakdown of every file or directory touched and why.
  - Notable design decisions or trade-offs made during implementation.
  - A **DoD checklist** ticking off every Definition of Done item from `docs/tasks.md` for the relevant task.
- Never merge the pull request yourself — leave it open for review unless explicitly instructed to merge.

## Integration Skills (External APIs)

- **AbacusAI RouteLLM:** all LLM calls go through `packages/llm`. Use the OpenAI-compatible SDK. Default model is `claude-sonnet-4-5`; override via env var. Never call the API directly from service files.
- **FatSecret:** all nutrition lookups go through `packages/nutrition`. OAuth 2.0 tokens are managed inside the provider — do not expose or pass them elsewhere. Results are normalized to per-gram before quantity scaling.
- **Telegram webhook:** registered exclusively via `TelegramAdapter.registerWebhook(app)`. Do not manually add Telegram routes to the Express app.
- All external API credentials come exclusively from environment variables (see `.env.example`). Never hardcode keys or secrets.
- Cache nutrition API responses in the `ApiCache` table keyed by `normalizedQueryHash` to avoid redundant external calls (`tdd.md §6.2`).
