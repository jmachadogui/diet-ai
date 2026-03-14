# Project Guidelines

## Design Documents

All project design documents live in `docs/`. Always read them before making architectural decisions or adding new features.

- `docs/prd.md` — Product Requirements Document. Source of truth for features, user stories, functional and non-functional requirements, and acceptance criteria.
- `docs/calorie_tracker_erd.md` — Entity-Relationship Diagram. Source of truth for data models, relationships, and database design decisions.
- `docs/tdd.md` — Technical Design Document. Source of truth for tech stack, repository structure, abstraction interfaces, system prompts, API design, and all implementation decisions.

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
