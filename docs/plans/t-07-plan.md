# T-07 — `apps/api` — Express Server Bootstrap — Implementation Plan

**Task refs:** `tasks.md §T-07`
**Related docs:** `tdd.md §3`, `tdd.md §8`, `tdd.md §9`, `tdd.md §10`, `tdd.md §12`, `tdd.md §14`
**Depends on:** T-02 (`packages/db` — Prisma client + repositories), T-03 (`packages/shared` — Zod schemas)

---

## Overview

`apps/api` is the Express server that ties every package together. The entry point (`src/index.ts`) is currently a stub (`export {}`). This task replaces it with a fully wired server that:

1. Applies global middleware (JSON body parser, request logger, `authenticateJWT`).
2. Mounts route stubs for every endpoint defined in `tdd.md §8` — all returning `501 Not Implemented` until later tasks implement them.
3. Initialises a BullMQ connection to Redis.
4. Wires provider factories (LLM, nutrition, messaging) from env vars.
5. Registers messaging adapter webhooks on the Express app.
6. Adds a central error handler middleware returning structured `{ error, message }` JSON.
7. Exposes `GET /health` returning `{ status: "ok" }`.

No business logic is implemented here — that belongs to T-08 through T-13. Every route stub simply calls `next(new NotImplementedError())` or responds `501` directly.

Core deliverables:

1. `src/middleware/authenticate.ts` — `authenticateJWT` middleware
2. `src/middleware/errorHandler.ts` — central error handler + `AppError` base class
3. `src/middleware/requestLogger.ts` — request logger
4. `src/routes/auth.ts` — auth route stubs
5. `src/routes/users.ts` — users route stubs
6. `src/routes/meals.ts` — meals route stubs
7. `src/routes/logs.ts` — logs route stub
8. `src/queue/connection.ts` — BullMQ Redis connection
9. `src/index.ts` — server entry point wiring everything together
10. `src/__tests__/server.test.ts` — unit/integration tests covering all DoD cases

---

## Step 1 — Define `AppError` and central error handler

**File:** `src/middleware/errorHandler.ts`

All application errors extend `AppError`. The central handler catches them and returns a structured JSON response. Unrecognised errors become `500` with no stack trace in the response body.

```typescript
import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly error: string,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotImplementedError extends AppError {
  constructor() {
    super(501, "NOT_IMPLEMENTED", "Not implemented");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, "UNAUTHORIZED", message);
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.error, message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" });
}
```

**Design notes:**
- `AppError` carries `statusCode` and a machine-readable `error` code alongside the human-readable `message`. This matches the `{ error, message }` shape required by the DoD.
- Stack traces are never included in the response body — they are only written to `stderr` via `console.error`.
- `NotImplementedError` and `UnauthorizedError` are defined here so route stubs and middleware can import them from a single location.

---

## Step 2 — Implement `authenticateJWT` middleware

**File:** `src/middleware/authenticate.ts`

Reads the `Authorization: Bearer <token>` header, verifies the JWT with `jsonwebtoken`, and attaches the decoded payload to `req.user`. Throws `UnauthorizedError` on any failure.

```typescript
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "./errorHandler";

export interface AuthenticatedUser {
  sub: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export function authenticateJWT(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new UnauthorizedError());
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "") as AuthenticatedUser;
    req.user = payload;
    next();
  } catch {
    next(new UnauthorizedError());
  }
}
```

**Design notes:**
- The `Express.Request` augmentation is declared here so TypeScript knows about `req.user` across all route files without a separate `types/express` file.
- `JWT_SECRET` is read from env at call time (not module load time) so tests can set it via `process.env` before importing.
- The middleware is applied selectively per-router (not globally) so that `/health`, `/auth/*`, and `/webhooks/*` remain unauthenticated — matching `tdd.md §10`.

---

## Step 3 — Implement request logger middleware

**File:** `src/middleware/requestLogger.ts`

A minimal logger that writes `METHOD PATH STATUS DURATIONms` to stdout on response finish. No external logging library is introduced at MVP.

```typescript
import type { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.path} ${res.statusCode} ${Date.now() - start}ms`);
  });
  next();
}
```

---

## Step 4 — Define route stubs

Each router file exports an Express `Router`. Every handler calls `next(new NotImplementedError())` so the central error handler returns `501`. Protected routers apply `authenticateJWT` at the router level.

### `src/routes/auth.ts`

Covers: `POST /auth/register`, `POST /auth/login`, `POST /auth/magic-link/generate`, `GET /auth/magic-link/verify`.

```typescript
import { Router } from "express";
import { NotImplementedError } from "../middleware/errorHandler";

const router = Router();

router.post("/register", (_req, _res, next) => next(new NotImplementedError()));
router.post("/login", (_req, _res, next) => next(new NotImplementedError()));
router.post("/magic-link/generate", (_req, _res, next) => next(new NotImplementedError()));
router.get("/magic-link/verify", (_req, _res, next) => next(new NotImplementedError()));

export default router;
```

### `src/routes/users.ts`

Covers: `GET /users/me`, `PATCH /users/me`. Both routes are protected.

```typescript
import { Router } from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { NotImplementedError } from "../middleware/errorHandler";

const router = Router();

router.use(authenticateJWT);
router.get("/me", (_req, _res, next) => next(new NotImplementedError()));
router.patch("/me", (_req, _res, next) => next(new NotImplementedError()));

export default router;
```

### `src/routes/meals.ts`

Covers: `GET /meals`, `GET /meals/:mealId`, `PATCH /meals/:mealId/items/:itemId`, `DELETE /meals/:mealId/items/:itemId`, `DELETE /meals/:mealId`. All protected.

```typescript
import { Router } from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { NotImplementedError } from "../middleware/errorHandler";

const router = Router();

router.use(authenticateJWT);
router.get("/", (_req, _res, next) => next(new NotImplementedError()));
router.get("/:mealId", (_req, _res, next) => next(new NotImplementedError()));
router.patch("/:mealId/items/:itemId", (_req, _res, next) => next(new NotImplementedError()));
router.delete("/:mealId/items/:itemId", (_req, _res, next) => next(new NotImplementedError()));
router.delete("/:mealId", (_req, _res, next) => next(new NotImplementedError()));

export default router;
```

### `src/routes/logs.ts`

Covers: `GET /logs`. Protected.

```typescript
import { Router } from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { NotImplementedError } from "../middleware/errorHandler";

const router = Router();

router.use(authenticateJWT);
router.get("/", (_req, _res, next) => next(new NotImplementedError()));

export default router;
```

---

## Step 5 — BullMQ Redis connection

**File:** `src/queue/connection.ts`

Exports a shared `IORedis` connection instance used by BullMQ queues and workers. The connection is created once at module load and reused across the app.

```typescript
import { Redis } from "ioredis";

export const redisConnection = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

redisConnection.on("error", (err) => {
  console.error("Redis connection error:", err);
});
```

**Design notes:**
- `maxRetriesPerRequest: null` is required by BullMQ — it disables the per-request retry limit so BullMQ can manage its own retry logic.
- The `error` event listener prevents unhandled rejection crashes on transient Redis disconnects.
- The connection is exported as a named export so workers (added in T-10) can import it directly.

---

## Step 6 — Server entry point

**File:** `src/index.ts`

Wires all middleware, routers, provider factories, messaging adapters, and BullMQ connection into a single Express app. Starts listening on `PORT` env var (default `3000`).

```typescript
import express from "express";
import { createLLMProvider } from "@diet-ai/llm";
import { createNutritionProvider } from "@diet-ai/nutrition";
import { createMessagingAdapters } from "@diet-ai/messaging";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { redisConnection } from "./queue/connection";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import mealsRouter from "./routes/meals";
import logsRouter from "./routes/logs";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/meals", mealsRouter);
app.use("/api/v1/logs", logsRouter);

const llmProvider = createLLMProvider();
const nutritionProvider = createNutritionProvider();
const messagingAdapters = createMessagingAdapters();

for (const adapter of messagingAdapters) {
  adapter.registerWebhook(app);
}

app.use(errorHandler);

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

export { app, llmProvider, nutritionProvider, messagingAdapters, redisConnection };
```

**Design notes:**
- `express.json()` is registered before all routers so every route receives a parsed body.
- `requestLogger` is registered before routers so it captures all requests including health checks.
- `/health` is mounted before `authenticateJWT` is applied to any router — it is intentionally public.
- Auth and webhook routes are also public; `authenticateJWT` is applied at the router level inside `users.ts`, `meals.ts`, and `logs.ts`.
- Provider factories are called once at startup. The returned instances are exported so future workers (T-10) can import them without re-initialising.
- `errorHandler` is registered last — Express identifies error-handling middleware by its four-argument signature.
- `redisConnection` is imported (and thus initialised) at startup so BullMQ connectivity is verified before the first request arrives.

---

## Step 7 — Unit tests

**File:** `src/__tests__/server.test.ts`

Uses `supertest` to make HTTP requests against the Express app without starting a real server. Provider factories and the Redis connection are mocked so tests run without external services.

### Mock setup

```typescript
jest.mock("@diet-ai/llm", () => ({ createLLMProvider: jest.fn(() => ({})) }));
jest.mock("@diet-ai/nutrition", () => ({ createNutritionProvider: jest.fn(() => ({})) }));
jest.mock("@diet-ai/messaging", () => ({
  createMessagingAdapters: jest.fn(() => [
    { registerWebhook: jest.fn(), platform: "telegram" },
  ]),
}));
jest.mock("../queue/connection", () => ({
  redisConnection: { on: jest.fn() },
}));
```

### Test cases

1. **`GET /health` → `200 { status: "ok" }`**
   - Assert: status `200`, body `{ status: "ok" }`.

2. **All route stubs return `501`**
   - For each stub route (`POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/magic-link/generate`, `GET /api/v1/auth/magic-link/verify`, `GET /api/v1/meals`, `GET /api/v1/meals/some-id`, `PATCH /api/v1/meals/some-id/items/some-item`, `DELETE /api/v1/meals/some-id/items/some-item`, `DELETE /api/v1/meals/some-id`, `GET /api/v1/logs`):
     - Assert: status `501`, body contains `{ error: "NOT_IMPLEMENTED" }`.
   - Note: protected routes need a valid JWT header to reach the stub; requests without a JWT should return `401` (tested separately below).

3. **Protected route without JWT → `401`**
   - `GET /api/v1/users/me` with no `Authorization` header.
   - Assert: status `401`, body `{ error: "UNAUTHORIZED" }`.
   - `GET /api/v1/meals` with no `Authorization` header → `401`.
   - `GET /api/v1/logs` with no `Authorization` header → `401`.

4. **Protected route with invalid JWT → `401`**
   - `GET /api/v1/users/me` with `Authorization: Bearer invalid-token`.
   - Assert: status `401`.

5. **Protected route with valid JWT → `501` (stub reached)**
   - Sign a JWT with `JWT_SECRET` set in `process.env` before the test.
   - `GET /api/v1/users/me` with `Authorization: Bearer <valid-token>`.
   - Assert: status `501` (stub reached, not `401`).

6. **Unhandled error inside a route → `500` with JSON body, no stack trace**
   - Register a temporary route that throws a plain `Error`.
   - Assert: status `500`, body `{ error: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" }`, body does not contain a `stack` field.

**`supertest` dependency:** add `supertest` and `@types/supertest` to `devDependencies` in `apps/api/package.json`.

---

## Step 8 — Add `supertest` to `devDependencies`

Update `apps/api/package.json`:

```json
"devDependencies": {
  ...
  "supertest": "^7.0.0",
  "@types/supertest": "^6.0.2"
}
```

Run `pnpm install` from the repo root after updating.

---

## Step 9 — Build & test verification

Run from the repo root:

```bash
pnpm --filter @diet-ai/api build
pnpm --filter @diet-ai/api test
```

Both must exit cleanly before the task is considered done. Also verify manually:

```bash
pnpm --filter @diet-ai/api dev
curl http://localhost:3000/health
# expected: {"status":"ok"}
```

---

## File map summary

```
apps/api/src/
├── index.ts                          (server entry point — replace stub)
├── middleware/
│   ├── authenticate.ts               (authenticateJWT + AuthenticatedUser type)
│   ├── errorHandler.ts               (AppError, NotImplementedError, UnauthorizedError, errorHandler)
│   └── requestLogger.ts              (requestLogger)
├── routes/
│   ├── auth.ts                       (auth route stubs)
│   ├── users.ts                      (users route stubs — protected)
│   ├── meals.ts                      (meals route stubs — protected)
│   └── logs.ts                       (logs route stub — protected)
├── queue/
│   └── connection.ts                 (shared IORedis connection for BullMQ)
└── __tests__/
    └── server.test.ts                (supertest-based tests covering all DoD cases)
```

---

## Definition of Done Checklist

- [ ] `pnpm --filter @diet-ai/api dev` starts without errors.
- [ ] `GET /health` returns `200 { status: "ok" }`.
- [ ] All route stubs are reachable and return `501`.
- [ ] A request to a protected route without a JWT returns `401`.
- [ ] An unhandled error thrown inside a route returns `500` with a JSON body (no stack trace in the response).
- [ ] BullMQ connects to Redis without errors on startup.
- [ ] `pnpm --filter @diet-ai/api build` passes with no TypeScript errors.
- [ ] `pnpm --filter @diet-ai/api test` passes with all tests green.
