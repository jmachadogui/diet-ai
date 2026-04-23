# T-09 Plan — Auth: Magic Link & Platform Linking

**Task:** T-09  
**PRD refs:** FR-2, FR-2a, FR-3, FR-3a  
**Depends on:** T-08 (complete)  
**Branch:** `feat/t-09-auth-magic-link-platform-linking`

---

## Overview

Implement the magic link flow for linking chat platform accounts (e.g., Telegram) to web accounts:

- `POST /api/v1/auth/magic-link/generate` — create a magic link token for platform linking
- `GET /api/v1/auth/magic-link/verify?token=` — verify and consume a magic link token
- Handle the Telegram `/start <token>` flow in `TelegramAdapter`

The magic link flow allows users to link their chat platform accounts to their web account so that messages from any linked platform are associated with the same user profile.

---

## Files to Create

| File | Purpose |
|---|---|
| `apps/api/src/services/magicLinkService.ts` | `generateToken()`, `verifyToken()` |
| `apps/api/src/__tests__/magicLink.test.ts` | Unit tests for magic link endpoints |

## Files to Modify

| File | Change |
|---|---|
| `apps/api/src/routes/auth.ts` | Add magic link endpoints |
| `packages/messaging/src/adapters/telegram.ts` | Handle `/start <token>` command |

---

## Step-by-Step Implementation

### Step 1 — Create `MagicLinkService`

**File:** `apps/api/src/services/magicLinkService.ts`

Responsibilities:
- `generateToken(userId, platform)`:
  1. Generate a random token (secure random string).
  2. Set expiry to 15 minutes from now.
  3. Call `createMagicLinkToken({ userId, platform, token, expiresAt })`.
  4. Generate and return a deep link URL based on platform (e.g., `https://t.me/YourBotName?start=token` for Telegram).
- `verifyToken(token)`:
  1. Call `findMagicLinkTokenByToken(token)` — if not found, throw `BadRequestError`.
  2. Check if token is expired (`token.expiresAt < new Date()`) — if expired, throw `BadRequestError`.
  3. Check if token is already used (`token.usedAt !== null`) — if used, throw `BadRequestError`.
  4. Call `markMagicLinkTokenAsUsed(token.id)`.
  5. Return the user ID and platform.

### Step 2 — Add magic link endpoints to auth routes

**File:** `apps/api/src/routes/auth.ts`

Add two new endpoints:
1. `POST /api/v1/auth/magic-link/generate`:
   - Require authentication (JWT).
   - Parse and validate body with schema: `{ platform: z.enum(['telegram']) }`.
   - Call `magicLinkService.generateToken(req.user.sub, platform)`.
   - Return `200 { token, deep_link_url }`.
   - On `BadRequestError` → `400`.

2. `GET /api/v1/auth/magic-link/verify`:
   - Parse and validate query with schema: `{ token: z.string().min(1) }`.
   - Call `magicLinkService.verifyToken(token)`.
   - Return `200 { message: "Account linked successfully" }`.
   - On `BadRequestError` → `400`.

### Step 3 — Handle Telegram `/start <token>` command

**File:** `packages/messaging/src/adapters/telegram.ts`

In the Telegram adapter:
1. Add a handler for the `/start` command.
2. Extract the token from the command arguments.
3. If a token is present:
   - Make an internal call to `POST /api/v1/auth/magic-link/verify?token=<token>`.
   - Handle success response by replying with "Your Telegram account is now linked to your web account!"
   - Handle error response by replying with the error message.
4. If no token is present, provide standard help text.

### Step 4 — Write unit tests

**File:** `apps/api/src/__tests__/magicLink.test.ts`

Scenarios to cover:
- `POST /auth/magic-link/generate` — success → 200 + token + deep link URL.
- `POST /auth/magic-link/generate` — no JWT → 401.
- `GET /auth/magic-link/verify` with valid token → 200 + links account.
- `GET /auth/magic-link/verify` with invalid token → 400.
- `GET /auth/magic-link/verify` with expired token → 400.
- `GET /auth/magic-link/verify` with already used token → 400.
- After linking, sending a Telegram message as that user resolves to the correct `userId` via `UserIdentity` lookup.

### Step 5 — Build and test

```bash
pnpm --filter @diet-ai/api build
pnpm --filter @diet-ai/api test
pnpm build
pnpm test
```

All must pass with no TypeScript errors.

---

## Key Design Decisions

- **Token security:** Tokens are single-use with 15-minute expiry to prevent abuse.
- **Deep link generation:** Platform-specific deep links are generated based on the platform type.
- **Internal API call:** The Telegram adapter makes an internal API call to verify the token rather than duplicating logic.
- **Error handling:** All token validation errors return 400 with appropriate messages to prevent information leakage.
- **Repository pattern:** All database access goes through repository helpers from `packages/db`.

---

## Definition of Done Checklist

- [ ] `POST /magic-link/generate` returns a token and a valid Telegram deep link URL.
- [ ] `GET /magic-link/verify` with a valid token creates a `UserIdentity` row and marks the token as used.
- [ ] A second call to verify with the same token returns `400`.
- [ ] A call to verify with an expired token returns `400`.
- [ ] After linking, sending a Telegram message as that user resolves to the correct `userId` via `UserIdentity` lookup.
- [ ] Unit tests cover: expired token, already-used token, unknown token — all return `400` with a descriptive message.
- [ ] `pnpm --filter @diet-ai/api build` passes with no TypeScript errors.
- [ ] `pnpm --filter @diet-ai/api test` passes — all tests green.
- [ ] `pnpm build` and `pnpm test` pass across all packages.