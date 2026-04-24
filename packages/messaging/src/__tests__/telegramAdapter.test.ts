import { TelegramAdapter } from "../telegram/adapter";
import { MessagingAdapterError } from "../adapter";

function makeAdapter() {
  const adapter = new TelegramAdapter("test-bot-token", "test-secret");
  const mockSendMessage = jest.fn().mockResolvedValue({});
  const mockHandleUpdate = jest.fn().mockResolvedValue(undefined);
  const textHandlers: Array<(ctx: any) => Promise<void>> = [];

  (adapter as any).bot = {
    telegram: { sendMessage: mockSendMessage },
    handleUpdate: mockHandleUpdate,
    on: jest.fn((event: string, cb: (ctx: any) => Promise<void>) => {
      if (event === "text") textHandlers.push(cb);
    }),
  };

  return { adapter, mockSendMessage, mockHandleUpdate, textHandlers };
}

function makeExpressApp() {
  const routes: Record<string, (req: any, res: any) => Promise<void>> = {};
  return {
    post: jest.fn((path: string, handler: (req: any, res: any) => Promise<void>) => {
      routes[path] = handler;
    }),
    routes,
  };
}

describe("TelegramAdapter", () => {
  describe("registerWebhook", () => {
    it("rejects requests without a secret token with 401", async () => {
      const { adapter } = makeAdapter();
      const app = makeExpressApp();
      adapter.registerWebhook(app as any);

      const req = { headers: {}, body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };

      await app.routes["/webhooks/telegram"](req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    });

    it("rejects requests with a wrong secret token with 401", async () => {
      const { adapter } = makeAdapter();
      const app = makeExpressApp();
      adapter.registerWebhook(app as any);

      const req = { headers: { "x-telegram-bot-api-secret-token": "wrong" }, body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };

      await app.routes["/webhooks/telegram"](req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("accepts requests with the correct secret token and returns 200", async () => {
      const { adapter, mockHandleUpdate } = makeAdapter();
      const app = makeExpressApp();
      adapter.registerWebhook(app as any);

      const body = { update_id: 1 };
      const req = { headers: { "x-telegram-bot-api-secret-token": "test-secret" }, body };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };

      await app.routes["/webhooks/telegram"](req, res);

      expect(mockHandleUpdate).toHaveBeenCalledWith(body);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("IncomingMessage mapping", () => {
    it("maps a Telegram text update to IncomingMessage correctly", async () => {
      const adapter = new TelegramAdapter("test-bot-token", "test-secret");
      const mockHandleUpdate = jest.fn().mockResolvedValue(undefined);
      const textHandlers: Array<(ctx: any) => Promise<void>> = [];

      (adapter as any).bot = {
        telegram: { sendMessage: jest.fn() },
        handleUpdate: mockHandleUpdate,
        on: jest.fn((event: string, cb: (ctx: any) => Promise<void>) => {
          if (event === "text") textHandlers.push(cb);
        }),
      };

      const handler = jest.fn().mockResolvedValue(undefined);
      adapter.onMessage(handler);

      (adapter as any).bot.on("text", async (ctx: any) => {
        const msg = {
          platformMessageId: String(ctx.message.message_id),
          platformUserId: String(ctx.from.id),
          platform: "telegram" as const,
          text: ctx.message.text,
          timestamp: new Date(ctx.message.date * 1000),
        };
        await (adapter as any).handler(msg);
      });

      const ctx = {
        message: { message_id: 42, text: "Hello world", date: 1700000000 },
        from: { id: 99 },
      };
      await textHandlers[0](ctx);

      expect(handler).toHaveBeenCalledWith({
        platformMessageId: "42",
        platformUserId: "99",
        platform: "telegram",
        text: "Hello world",
        timestamp: new Date(1700000000 * 1000),
      });
    });
  });

  describe("sendMessage", () => {
    it("calls bot.telegram.sendMessage with correct arguments", async () => {
      const { adapter, mockSendMessage } = makeAdapter();

      await adapter.sendMessage({ platformUserId: "123", platform: "telegram", text: "hello" });

      expect(mockSendMessage).toHaveBeenCalledWith("123", "hello");
    });

    it("throws MessagingAdapterError when Telegram API fails", async () => {
      const { adapter, mockSendMessage } = makeAdapter();
      mockSendMessage.mockRejectedValue(new Error("network error"));

      await expect(
        adapter.sendMessage({ platformUserId: "123", platform: "telegram", text: "hello" })
      ).rejects.toThrow(MessagingAdapterError);
    });
  });
});
