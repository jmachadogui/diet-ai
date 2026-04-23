# T-06 — `packages/messaging` — Messaging Adapter Abstraction & Telegram Implementation — Implementation Plan

**Task refs:** `tasks.md §T-06`
**Related docs:** `tdd.md §5.1`, `prd.md §FR-4`, `prd.md §NFR-3`
**Depends on:** T-03 (`packages/shared` Zod schemas — already completed)

---

## Overview

`packages/messaging` provides the messaging platform abstraction layer. The package already has its `package.json` (with `telegraf` and `@diet-ai/shared` deps) and a stub `src/index.ts`. All implementation goes into new files under `packages/messaging/src/`.

Core deliverables:

1. `MessagingAdapter` interface + `MessagingAdapterError` (`adapter.ts`)
2. `TelegramAdapter` implementation:
   - Registers `POST /webhooks/telegram` on the Express app
   - Maps raw Telegram updates to `IncomingMessage`
   - Calls the registered `onMessage` handler
   - Validates `X-Telegram-Bot-Api-Secret-Token` header; rejects without it (`401`)
   - `sendMessage()` calls Telegraf's `telegram.sendMessage()`
3. Adapter factory reading `MESSAGING_PLATFORMS` env var (`factory.ts`)
4. Barrel export (`index.ts`)
5. Unit tests covering all DoD cases

**Design note on Express typing:** `TelegramAdapter.registerWebhook(app)` accepts `Express` from the `express` package. Since `express` is a dependency of `apps/api` (not `packages/messaging`), the adapter takes `app` typed as `import('express').Application` — this avoids adding `express` as a direct dependency to the messaging package. Alternatively, use a generic `{ post: Function }` duck-type if preferred to avoid any Express type import. The plan uses `import type { Application } from 'express'` with `express` added to `devDependencies` (type-only use at compile time).

---

## Step 1 — Define the `MessagingAdapter` interface and `MessagingAdapterError`

**File:** `packages/messaging/src/adapter.ts`

The interface mirrors `tdd.md §5.1` exactly. `IncomingMessage` and `OutgoingMessage` are imported from `@diet-ai/shared` — not redefined here.

```typescript
import type { Application } from "express";
import type { IncomingMessage, OutgoingMessage } from "@diet-ai/shared";

export type { IncomingMessage, OutgoingMessage };

export interface MessagingAdapter {
  platform: string;
  registerWebhook(app: Application): void;
  sendMessage(msg: OutgoingMessage): Promise<void>;
  onMessage(handler: (msg: IncomingMessage) => Promise<void>): void;
}

export class MessagingAdapterError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "MessagingAdapterError";
  }
}
```

**Design notes:**
- `MessagingAdapterError` is thrown for unrecoverable adapter-level failures (e.g. Telegram API unreachable on `sendMessage`).
- The `onMessage` handler is registered by `apps/api` after constructing the adapter. The adapter stores it internally and calls it on every valid incoming update.
- `IncomingMessage` / `OutgoingMessage` shapes are already defined in `packages/shared` (`src/messaging.ts`) — re-exporting them here is a convenience so consumers only need to import from `@diet-ai/messaging`.

---

## Step 2 — Implement `TelegramAdapter`

**File:** `packages/messaging/src/telegram/adapter.ts`

### Constructor

```typescript
import { Telegraf } from "telegraf";
import type { Application } from "express";
import type { IncomingMessage, OutgoingMessage } from "@diet-ai/shared";
import type { MessagingAdapter } from "../adapter";
import { MessagingAdapterError } from "../adapter";

export class TelegramAdapter implements MessagingAdapter {
  readonly platform = "telegram";

  private bot: Telegraf;
  private handler: ((msg: IncomingMessage) => Promise<void>) | null = null;

  constructor(
    private readonly botToken: string = process.env.TELEGRAM_BOT_TOKEN ?? "",
    private readonly secretToken: string = process.env.TELEGRAM_WEBHOOK_SECRET ?? ""
  ) {
    this.bot = new Telegraf(this.botToken);
  }
  ...
}
```

Accepting `botToken` and `secretToken` as constructor parameters makes the class fully injectable and testable without real environment variables.

### `onMessage(handler)`

Stores the handler reference:

```typescript
onMessage(handler: (msg: IncomingMessage) => Promise<void>): void {
  this.handler = handler;
}
```

### `registerWebhook(app: Application): void`

Registers a `POST /webhooks/telegram` route on the Express app. This is the only Telegraf-specific Express route; no Telegraf middleware is added globally.

**Flow:**

1. Validate `X-Telegram-Bot-Api-Secret-Token` header against `this.secretToken`. If missing or wrong → respond `401` and return immediately.
2. Call `this.bot.handleUpdate(req.body)` to let Telegraf process the raw update object.
3. Respond `200 OK`.

Telegraf message handler (registered in constructor or in `registerWebhook`):

```typescript
this.bot.on("text", async (ctx) => {
  if (!this.handler) return;
  const msg = mapTelegramUpdate(ctx);
  await this.handler(msg);
});
```

**`mapTelegramUpdate(ctx)` → `IncomingMessage`:**

```typescript
function mapTelegramUpdate(ctx): IncomingMessage {
  return {
    platformMessageId: String(ctx.message.message_id),
    platformUserId: String(ctx.from.id),
    platform: "telegram",
    text: ctx.message.text,
    timestamp: new Date(ctx.message.date * 1000),
  };
}
```

**Design notes:**
- Using `bot.handleUpdate(req.body)` instead of `bot.launch()` keeps webhook mode explicit and avoids Telegraf's internal HTTP server conflicting with Express.
- The secret token check runs before `handleUpdate` so unauthenticated requests never touch the bot logic.
- Only `text` messages are handled in MVP. Non-text updates (photos, stickers, etc.) are silently ignored.

### `sendMessage(msg: OutgoingMessage): Promise<void>`

```typescript
async sendMessage(msg: OutgoingMessage): Promise<void> {
  try {
    await this.bot.telegram.sendMessage(msg.platformUserId, msg.text);
  } catch (err) {
    throw new MessagingAdapterError(
      `Failed to send Telegram message to ${msg.platformUserId}`,
      err
    );
  }
}
```

---

## Step 3 — Implement adapter factory

**File:** `packages/messaging/src/factory.ts`

`MESSAGING_PLATFORMS` is a comma-separated list of platform names (e.g. `"telegram"` or `"telegram,discord"` for future use). The factory returns an array of adapters, one per active platform.

```typescript
import { TelegramAdapter } from "./telegram/adapter";
import type { MessagingAdapter } from "./adapter";

export function createMessagingAdapters(): MessagingAdapter[] {
  const platforms = (process.env.MESSAGING_PLATFORMS ?? "telegram")
    .split(",")
    .map((p) => p.trim().toLowerCase());

  return platforms.map((platform) => {
    if (platform === "telegram") return new TelegramAdapter();
    throw new Error(`Unknown MESSAGING_PLATFORMS entry: "${platform}"`);
  });
}
```

**Design notes:**
- Returns an array so `apps/api` can loop over adapters and call `registerWebhook(app)` on each.
- Throws a descriptive error at startup for unrecognised platform names — surfaces misconfiguration early.

---

## Step 4 — Update barrel export

**File:** `packages/messaging/src/index.ts`

```typescript
export * from "./adapter";
export * from "./factory";
export { TelegramAdapter } from "./telegram/adapter";
```

---

## Step 5 — Add `express` to `devDependencies` in `package.json`

`express` types are needed at compile time (for `Application` in `registerWebhook`). Add it as a dev dependency:

```json
"devDependencies": {
  ...
  "@types/express": "^4.17.21",
  "express": "^4.19.2"
}
```

This keeps `express` out of the runtime bundle for the messaging package (it lives in `apps/api`) while satisfying the TypeScript compiler.

---

## Step 6 — Unit tests

### `packages/messaging/src/__tests__/telegramAdapter.test.ts`

Tests for `TelegramAdapter`. The Telegraf `bot.telegram.sendMessage` and `bot.handleUpdate` methods are mocked via `jest.spyOn` or by replacing the `bot` instance on the adapter.

**Mock setup:**

```typescript
const mockSendMessage = jest.fn().mockResolvedValue({});
const mockHandleUpdate = jest.fn().mockResolvedValue(undefined);

// Inject mocks into adapter instance after construction
(adapter as any).bot = {
  telegram: { sendMessage: mockSendMessage },
  handleUpdate: mockHandleUpdate,
  on: jest.fn((event, cb) => { /* capture text handler */ }),
};
```

**Test cases:**

1. **`IncomingMessage` mapping from a raw Telegram update fixture**
   - Build a minimal Telegram `text` update object.
   - Call `registerWebhook(mockApp)` and simulate the `POST /webhooks/telegram` handler (with valid secret token header).
   - Assert: the registered `onMessage` handler is called with a correctly shaped `IncomingMessage`:
     - `platformMessageId` = `String(message_id)`
     - `platformUserId` = `String(from.id)`
     - `platform` = `"telegram"`
     - `text` = message text
     - `timestamp` = `new Date(date * 1000)`

2. **`registerWebhook` — request without valid secret token → HTTP 401**
   - Simulate a POST request with a missing or wrong `X-Telegram-Bot-Api-Secret-Token` header.
   - Assert: response status is `401`; `onMessage` handler is never called.

3. **`registerWebhook` — request with valid secret token → HTTP 200**
   - Simulate a POST request with the correct header.
   - Assert: response status is `200`; `bot.handleUpdate` is called with `req.body`.

4. **`sendMessage()` delivers a text reply to the correct chat**
   - Call `adapter.sendMessage({ platformUserId: "123", platform: "telegram", text: "hello" })`.
   - Assert: `bot.telegram.sendMessage` called with `("123", "hello")`.

5. **`sendMessage()` throws `MessagingAdapterError` when Telegram API fails**
   - Mock `bot.telegram.sendMessage` to reject with a network error.
   - Assert: `MessagingAdapterError` is thrown.

### `packages/messaging/src/__tests__/factory.test.ts`

1. `MESSAGING_PLATFORMS=telegram` (or unset) → returns array with one `TelegramAdapter` instance.
2. `MESSAGING_PLATFORMS=telegram,telegram` → returns two adapters.
3. `MESSAGING_PLATFORMS=unknown` → throws with a message referencing the invalid value.

---

## Step 7 — Build & test verification

Run from the repo root:

```bash
pnpm --filter @diet-ai/messaging build
pnpm --filter @diet-ai/messaging test
```

Both must exit cleanly before the task is considered done.

---

## File map summary

```
packages/messaging/src/
├── index.ts                          (update barrel export)
├── adapter.ts                        (MessagingAdapter interface + MessagingAdapterError)
├── factory.ts                        (createMessagingAdapters)
├── telegram/
│   └── adapter.ts                    (TelegramAdapter class + mapTelegramUpdate)
└── __tests__/
    ├── telegramAdapter.test.ts       (TelegramAdapter unit tests)
    └── factory.test.ts               (factory env var tests)
```

---

## Definition of Done Checklist

- [ ] `TelegramAdapter` registers the webhook route on the Express app without errors.
- [ ] A Telegram message sent to the bot triggers the `onMessage` handler with correctly shaped `IncomingMessage` (verified via unit test fixture and manual test with a real bot token).
- [ ] `sendMessage()` delivers a text reply to the correct Telegram chat (manual smoke test).
- [ ] Requests without a valid `X-Telegram-Bot-Api-Secret-Token` header are rejected with HTTP 401.
- [ ] Unit tests cover `IncomingMessage` mapping from a raw Telegram update fixture.
- [ ] `pnpm --filter @diet-ai/messaging build` passes with no TypeScript errors.
- [ ] `pnpm --filter @diet-ai/messaging test` passes with all tests green.
