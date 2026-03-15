# diet-ai

A chat-first natural language calorie tracker. Users log meals by sending free-form text messages via Telegram. An LLM parses the message into structured food items, a nutrition API resolves macros, and everything is stored centrally. A web portal handles enrollment, goal setting, and history review.

## Table of Contents

- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Packages](#packages)
- [Data Model](#data-model)
- [API Reference](#api-reference)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Testing](#testing)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         apps/api (Express)                      │
│                                                                 │
│  ┌──────────────┐   ┌─────────────────┐   ┌─────────────────┐  │
│  │ REST API     │   │ Webhook Route   │   │ BullMQ Workers  │  │
│  │ /api/v1/*    │   │ /webhooks/:plat │   │ (message-proc.) │  │
│  └──────┬───────┘   └────────┬────────┘   └────────┬────────┘  │
│         └────────────────────┴──────────────────────┘           │
│                              │                                  │
│                     ┌────────▼────────┐                         │
│                     │  Service Layer  │                         │
│                     │  - LogService   │                         │
│                     │  - MealService  │                         │
│                     │  - UserService  │                         │
│                     │  - AuthService  │                         │
│                     └────────┬────────┘                         │
└──────────────────────────────┼──────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
   ┌──────▼──────┐    ┌────────▼───────┐   ┌───────▼────────┐
   │  packages/  │    │  packages/llm  │   │ packages/      │
   │  db         │    │  LLMProvider   │   │ nutrition      │
   │  (Prisma)   │    │  interface     │   │ NutritionProv. │
   └──────┬──────┘    └────────┬───────┘   └───────┬────────┘
          │                    │                    │
          ▼                    ▼                    ▼
     PostgreSQL          AbacusAI RouteLLM        FatSecret
                         (configurable)        (configurable)


  packages/messaging
  MessagingAdapter interface
  └── TelegramAdapter (Telegraf)
  └── (future: WhatsAppAdapter, DiscordAdapter)
```

**Core design principles:**

- **Messaging-agnostic** — all chat platform logic sits behind a `MessagingAdapter` interface. Telegram is the first implementation; WhatsApp and Discord can be added without touching core logic.
- **LLM-agnostic** — all LLM calls go through an `LLMProvider` interface. AbacusAI RouteLLM is the default; any OpenAI-compatible provider can be swapped via env var.
- **Nutrition API-agnostic** — all nutrition lookups go through a `NutritionProvider` interface. FatSecret is the first implementation.
- **TypeScript throughout** — shared Zod schemas enforce type safety across all packages.
- **Monorepo** — all packages live in one repository managed with `pnpm workspaces`.

### Message Processing Pipeline

When a user sends a message via Telegram:

1. `TelegramAdapter` receives the update and enqueues a `message-process` BullMQ job.
2. The worker creates a `Log` record (`processing_status: "processing"`).
3. `LLMProvider.parseMessage()` extracts intent and structured food items.
   - If clarification is needed, the bot asks one question and waits (state stored in Redis with a 5-minute TTL).
4. For each food item, `NutritionProvider.lookup()` resolves calories and macros (with DB-level caching).
5. `Meal` and `MealItem` records are created with aggregated totals and full provenance.
6. The `Log` record is updated with `processing_status: "success"` and `latency_ms`.
7. The bot replies with a summary of the logged meal.

---

## Repository Structure

```
diet-ai/
├── package.json                  # root workspace config
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .env.example
│
├── packages/
│   ├── shared/                   # shared Zod schemas, types, utilities
│   ├── db/                       # Prisma schema, client, migrations
│   ├── llm/                      # LLM abstraction + AbacusAI implementation
│   ├── nutrition/                # Nutrition API abstraction + FatSecret implementation
│   └── messaging/                # Messaging abstraction + TelegramAdapter
│
├── apps/
│   ├── api/                      # Express backend (REST API + webhook + BullMQ workers)
│   └── web/                      # Next.js 14 web frontend (App Router)
│
└── infra/
    └── docker-compose.yml        # PostgreSQL 16 + Redis 7 for local development
```

---

## Packages

### `packages/shared`
Zod schemas and inferred TypeScript types shared across all packages: `MealParseResultSchema`, `EditInstructionSchema`, `NutritionQuerySchema`, `NutritionResultSchema`, `PlatformEnum`, `MealOccasionEnum`, `IntentEnum`. No runtime dependencies beyond `zod`.

### `packages/db`
Prisma schema, generated client, migrations, and typed repository helpers. Exports a singleton `prisma` client. All database access goes through this package.

### `packages/llm`
`LLMProvider` interface and `AbacusAIProvider` implementation. Uses the `openai` SDK pointed at `https://routellm.abacus.ai/v1`. LLM responses are validated with Zod before being returned; malformed responses throw a typed `LLMParseError`. Default model: `claude-sonnet-4-5` (configurable per task via env vars).

### `packages/nutrition`
`NutritionProvider` interface and `FatSecretProvider` implementation. Handles OAuth 2.0 token management, per-gram macro normalization, quantity scaling, and a DB-backed cache (`API_CACHE` table, 7-day TTL by default).

### `packages/messaging`
`MessagingAdapter` interface and `TelegramAdapter` implementation (via Telegraf). Each adapter registers its own webhook route on the Express app and handles platform-specific signature verification.

### `apps/api`
Express server. Mounts REST routes under `/api/v1/`, webhook routes for each active messaging adapter, and initializes BullMQ workers. Wires all providers via factory functions that read env vars.

### `apps/web`
Next.js 14 app (App Router). Server Components fetch from `apps/api` using a JWT stored in an HTTP-only cookie. Forms use `react-hook-form` with Zod resolvers from `packages/shared`. Charts use `recharts`.

---

## Data Model

```
USERS ──< USER_IDENTITIES        (one user, many platform accounts)
USERS ──< MAGIC_LINK_TOKENS      (short-lived, single-use linking tokens)
USERS ──< LOGS                   (every incoming message, raw + parsed)
USERS ──< MEALS                  (normalized meal events)
USERS ──< USER_WEIGHT_HISTORY    (longitudinal weight time series)
USERS ──< EDIT_HISTORY           (full audit trail of all changes)

LOGS  ──< MEALS                  (source_log_id — end-to-end traceability)
MEALS ──< MEAL_ITEMS             (per-food item with nutrition provenance)
MEALS ──< EDIT_HISTORY

API_CACHE                        (nutrition lookup cache, keyed by query hash)
```

Key design decisions:
- Platform identifiers (e.g. Telegram chat ID) are stored only in `USER_IDENTITIES`, never as the core domain key.
- Every chat-created meal references its source `Log` record via `source_log_id`.
- Every edit (chat or web) writes an `EDIT_HISTORY` record with old/new JSON snapshots.
- `LOGS` stores raw text, LLM output, processing status, clarification prompts/responses, and `latency_ms` for full observability.

---

## API Reference

Base path: `/api/v1`

All protected routes require `Authorization: Bearer <jwt>`.

### Auth
| Method | Path | Description |
|---|---|---|
| `POST` | `/auth/register` | Create new user account |
| `POST` | `/auth/login` | Password login, returns JWT |
| `POST` | `/auth/magic-link/generate` | Generate magic link token for platform linking |
| `GET` | `/auth/magic-link/verify?token=` | Verify and consume magic link token |

### Users
| Method | Path | Description |
|---|---|---|
| `GET` | `/users/me` | Get current user profile |
| `PATCH` | `/users/me` | Update profile (height, weight, goal, etc.) |

### Meals
| Method | Path | Description |
|---|---|---|
| `GET` | `/meals?date=YYYY-MM-DD` | List meals for a given date |
| `GET` | `/meals/:mealId` | Get meal with all items |
| `PATCH` | `/meals/:mealId/items/:itemId` | Update a meal item |
| `DELETE` | `/meals/:mealId/items/:itemId` | Remove a meal item |
| `DELETE` | `/meals/:mealId` | Delete entire meal |

### Logs
| Method | Path | Description |
|---|---|---|
| `GET` | `/logs?from=&to=` | List raw logs for a date range (max 31 days) |

### Webhooks
| Method | Path | Description |
|---|---|---|
| `POST` | `/webhooks/telegram` | Telegram update endpoint |

---

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for PostgreSQL and Redis)

---

## Local Development

**1. Start infrastructure**

```bash
docker compose -f infra/docker-compose.yml up -d
```

This starts PostgreSQL 16 on port `5432` and Redis 7 on port `6379`.

**2. Install dependencies**

```bash
pnpm install
```

**3. Configure environment**

```bash
cp .env.example .env
```

Fill in the required values (see [Environment Variables](#environment-variables) below).

**4. Run database migrations**

```bash
pnpm --filter @diet-ai/db migrate:dev
```

**5. Start the API**

```bash
pnpm --filter @diet-ai/api dev
```

The API starts with `ts-node --watch` on the port defined in your `.env`.

**6. Start the web app**

```bash
pnpm --filter @diet-ai/web dev
```

Next.js dev server starts on `http://localhost:3000` by default.

To start both apps in parallel:

```bash
pnpm dev
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dietai

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=changeme

# LLM
LLM_PROVIDER=abacusai
ABACUSAI_API_KEY=
ABACUSAI_BASE_URL=https://routellm.abacus.ai/v1
ABACUSAI_MODEL=route-llm

# Nutrition API
NUTRITION_PROVIDER=fatsecret
FATSECRET_CLIENT_ID=
FATSECRET_CLIENT_SECRET=

# Messaging
MESSAGING_PLATFORMS=telegram
TELEGRAM_BOT_TOKEN=
TELEGRAM_WEBHOOK_SECRET=

# Cache
NUTRITION_CACHE_TTL_DAYS=7

# Queue
QUEUE_CONCURRENCY=5
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string (used by BullMQ and clarification state) |
| `JWT_SECRET` | Secret for signing JWTs (7-day expiry) |
| `LLM_PROVIDER` | LLM provider to use (`abacusai`) |
| `ABACUSAI_API_KEY` | AbacusAI API key |
| `ABACUSAI_MODEL` | Model name; `route-llm` delegates to AbacusAI's automatic router |
| `NUTRITION_PROVIDER` | Nutrition provider to use (`fatsecret`) |
| `FATSECRET_CLIENT_ID` | FatSecret OAuth2 client ID |
| `FATSECRET_CLIENT_SECRET` | FatSecret OAuth2 client secret |
| `MESSAGING_PLATFORMS` | Comma-separated list of active platforms (`telegram`) |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token from BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | Secret token for verifying Telegram webhook requests |
| `NUTRITION_CACHE_TTL_DAYS` | How long to cache nutrition API results (default: `7`) |
| `QUEUE_CONCURRENCY` | Number of concurrent BullMQ workers (default: `5`) |

---

## Scripts

Run from the repository root:

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in parallel (watch mode) |
| `pnpm build` | Build all packages then all apps |
| `pnpm test` | Run Jest across all packages |
| `pnpm lint` | Run linter across all packages |

Run for a specific package with `pnpm --filter <package-name> <script>`, e.g.:

```bash
pnpm --filter @diet-ai/api dev
pnpm --filter @diet-ai/db migrate:dev
```

---

## Testing

**Framework:** Jest + `ts-jest`

Unit tests are co-located with source files (`*.test.ts`). Integration tests live in `apps/api/src/__tests__/` and use a real Prisma client against a test PostgreSQL instance, with external HTTP calls (LLM, FatSecret) mocked.

```bash
pnpm test
```

Coverage target: 80% line coverage on `packages/*` and `apps/api/src/services/`.
