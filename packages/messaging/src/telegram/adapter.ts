import { Telegraf } from "telegraf";
import type { Application } from "express";
import type { IncomingMessage, OutgoingMessage } from "@diet-ai/shared";
import type { MessagingAdapter } from "../adapter";
import { MessagingAdapterError } from "../adapter";

function mapTelegramUpdate(ctx: {
  message: { message_id: number; text: string; date: number };
  from: { id: number };
}): IncomingMessage {
  return {
    platformMessageId: String(ctx.message.message_id),
    platformUserId: String(ctx.from.id),
    platform: "telegram",
    text: ctx.message.text,
    timestamp: new Date(ctx.message.date * 1000),
  };
}

export class TelegramAdapter implements MessagingAdapter {
  readonly platform = "telegram";

  private bot: Telegraf;
  private handler: ((msg: IncomingMessage) => Promise<void>) | null = null;

  constructor(
    private readonly botToken: string = process.env.TELEGRAM_BOT_TOKEN ?? "",
    private readonly secretToken: string = process.env.TELEGRAM_WEBHOOK_SECRET ?? ""
  ) {
    this.bot = new Telegraf(this.botToken);
    this.bot.on("text", async (ctx) => {
      if (!this.handler) return;
      const msg = mapTelegramUpdate(ctx as any);
      await this.handler(msg);
    });
  }

  onMessage(handler: (msg: IncomingMessage) => Promise<void>): void {
    this.handler = handler;
  }

  registerWebhook(app: Application): void {
    app.post("/webhooks/telegram", async (req, res) => {
      const token = req.headers["x-telegram-bot-api-secret-token"];
      if (!token || token !== this.secretToken) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      await this.bot.handleUpdate(req.body);
      res.status(200).send("OK");
    });
  }

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
}
