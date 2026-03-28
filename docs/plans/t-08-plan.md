# T-08 Plan — Auth: Registration, Login & JWT

**Task:** T-08  
**PRD refs:** FR-1, NFR-7  
**Depends on:** T-02 (complete), T-07 (complete)  
**Branch:** `feat/t-08-auth-registration-login-jwt`

---

## Overview

Implement the full authentication layer for the REST API:

- `POST /api/v1/auth/register` — create user, hash password, return JWT
- `POST /api/v1/auth/login` — verify credentials, return JWT
- `GET /api/v1/users/me` — return current user profile
- `PATCH /api/v1/users/me` — update profile fields; write `UserWeightHistory` on weight change

The `authenticateJWT` middleware already exists in `apps/api/src/middleware/authenticate.ts` (implemented in T-07). All route stubs already exist and return `501`. This task replaces those stubs with real logic.

All DB access goes through repository helpers from `packages/db` — no raw Prisma calls in service or route files.

---

## Files to Create

| File | Purpose |
|---|---|
| `apps/api/src/services/authService.ts` | `register()`, `login()`, `generateToken()` |
| `apps/api/src/services/userService.ts` | `getProfile()`, `updateProfile()` |
| `apps/api/src/__tests__/auth.test.ts` | Unit tests for auth routes |
| `apps/api/src/__tests__/users.test.ts` | Unit tests for users routes |

## Files to Modify

| File | Change |
|---|---|
| `apps/api/src/routes/auth.ts` | Replace `501` stubs with real handler logic |
| `apps/api/src/routes/users.ts` | Replace `501` stubs with real handler logic |
| `apps/api/package.json` | Add `bcrypt` + `@types/bcrypt` if not already present |

---

## Step-by-Step Implementation

### Step 1 — Verify dependencies

Check `apps/api/package.json` for `bcrypt` and `jsonwebtoken`. Both should already be present (listed in `tdd.md §15`). If missing, add them via `pnpm --filter @diet-ai/api add bcrypt jsonwebtoken` and their types.

### Step 2 — Create `AuthService`

**File:** `apps/api/src/services/authService.ts`

Responsibilities:
- `register(email, password, profileFields)`:
  1. Call `findUserByEmail(email)` — if found, throw `ConflictError` (409).
  2. Hash password with `bcrypt.hash(password, 10)`.
  3. Call `createUser({ email, passwordHash, ...profileFields })`.
  4. Return signed JWT via `generateToken(user)`.
- `login(email, password)`:
  1. Call `findUserByEmail(email)` — if not found, throw `UnauthorizedError` (401).
  2. Call `bcrypt.compare(password, user.passwordHash)` — if false, throw `UnauthorizedError`.
  3. Return signed JWT via `generateToken(user)`.
- `generateToken(user)`:
  - Signs `{ sub: user.id, email: user.email }` with `JWT_SECRET` env var.
  - Expiry: `"7d"` (per `tdd.md §10`).

Error types to add to `errorHandler.ts`:
- `ConflictError` — HTTP 409, `error: "Conflict"`.
- `BadRequestError` — HTTP 400, `error: "Bad Request"`.
- `NotFoundError` — HTTP 404, `error: "Not Found"`.

### Step 3 — Create `UserService`

**File:** `apps/api/src/services/userService.ts`

Responsibilities:
- `getProfile(userId)`:
  1. Call `findUserById(userId)` — if not found, throw `NotFoundError`.
  2. Return user (omit `passwordHash` from the response shape).
- `updateProfile(userId, fields)`:
  1. If `weightKg` is present in `fields`, call `recordWeight(userId, fields.weightKg, "web")` before updating.
  2. Call `updateUser(userId, fields)`.
  3. Return updated user (omit `passwordHash`).

### Step 4 — Add Zod validation schemas (inline in routes)

Use Zod to validate request bodies before passing to services. Per `AGENTS.md`, Zod schemas from `packages/shared` are the source of truth for shared shapes — but request-body schemas specific to auth routes can live inline in the route file since they are not shared across packages.

**Register body schema:**
```
{ email: z.string().email(), password: z.string().min(8), age?: number, sex?: string, heightCm?: number, weightKg?: number, activityLevel?: string, dailyCalorieGoal?: number }
```

**Login body schema:**
```
{ email: z.string().email(), password: z.string().min(1) }
```

**PATCH /users/me body schema:**
```
{ age?: number, sex?: string, heightCm?: number, weightKg?: number, activityLevel?: string, dailyCalorieGoal?: number }
```

On Zod parse failure → throw `BadRequestError` with the Zod error message.

### Step 5 — Implement `POST /auth/register`

In `apps/api/src/routes/auth.ts`:
1. Parse and validate body with register schema.
2. Call `authService.register(...)`.
3. Return `201 { token, user: { id, email } }`.
4. On `ConflictError` → `409`.
5. On `BadRequestError` → `400`.

### Step 6 — Implement `POST /auth/login`

In `apps/api/src/routes/auth.ts`:
1. Parse and validate body with login schema.
2. Call `authService.login(...)`.
3. Return `200 { token }`.
4. On `UnauthorizedError` → `401`.

### Step 7 — Implement `GET /users/me`

In `apps/api/src/routes/users.ts`:
1. Read `req.user.sub` (set by `authenticateJWT`).
2. Call `userService.getProfile(req.user.sub)`.
3. Return `200 { user }` (no `passwordHash`).

### Step 8 — Implement `PATCH /users/me`

In `apps/api/src/routes/users.ts`:
1. Parse and validate body with profile update schema.
2. Call `userService.updateProfile(req.user.sub, body)`.
3. Return `200 { user }` (no `passwordHash`).

### Step 9 — Write unit tests

**`apps/api/src/__tests__/auth.test.ts`** — use `supertest` against the existing `app`. Mock `packages/db` repositories via `jest.mock`.

Scenarios to cover:
- `POST /register` — success → 201 + JWT.
- `POST /register` — duplicate email → 409.
- `POST /register` — missing required fields → 400.
- `POST /register` — password stored as bcrypt hash (never plaintext).
- `POST /login` — correct credentials → 200 + JWT.
- `POST /login` — wrong password → 401.
- `POST /login` — unknown email → 401.
- `GET /users/me` — valid JWT → 200 + user profile.
- `GET /users/me` — no JWT → 401.
- `GET /users/me` — invalid JWT → 401.
- `PATCH /users/me` — updates profile fields → 200.
- `PATCH /users/me` — weight change → `recordWeight` called + `UserWeightHistory` row written.
- `PATCH /users/me` — no JWT → 401.

### Step 10 — Build and test

```bash
pnpm --filter @diet-ai/api build
pnpm --filter @diet-ai/api test
pnpm build
pnpm test
```

All must pass with no TypeScript errors.

---

## Key Design Decisions

- **No raw Prisma in routes or services** — all DB access via repository helpers from `packages/db`.
- **`passwordHash` never returned** — strip it from every user object before sending in a response. Use a `sanitizeUser()` helper inside `userService.ts`.
- **`ConflictError`, `BadRequestError`, `NotFoundError`** added to the existing `errorHandler.ts` — consistent with the central error handler pattern established in T-07.
- **Zod validation inline in routes** — request-body schemas are route-local and not shared across packages, so they do not belong in `packages/shared`.
- **`recordWeight` called before `updateUser`** — ensures the history entry is written even if the profile update fails (acceptable at MVP; a DB transaction would be the production-grade approach but is out of scope here).
- **JWT payload:** `{ sub: userId, email }` — matches the `AuthenticatedUser` interface already defined in `authenticate.ts`.

---

## Definition of Done Checklist

- [ ] `POST /register` creates a `User` row; password is stored as a bcrypt hash (never plaintext).
- [ ] `POST /login` returns a valid JWT for correct credentials and `401` for wrong credentials.
- [ ] `GET /users/me` returns the user profile when a valid JWT is provided.
- [ ] `PATCH /users/me` updates profile fields and writes a `UserWeightHistory` row when `weight_kg` changes.
- [ ] Unit tests cover: duplicate email on register → `409`, missing required fields → `400`, invalid JWT → `401`.
- [ ] `pnpm --filter @diet-ai/api build` passes with no TypeScript errors.
- [ ] `pnpm --filter @diet-ai/api test` passes — all tests green.
- [ ] `pnpm build` and `pnpm test` pass across all packages.
