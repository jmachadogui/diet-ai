import { Telegraf } from "telegraf";
import type { Application } from "express";
import type { IncomingMessage, OutgoingMessage } from "@diet-ai/shared";
import type { MessagingAdapter } from "../adapter";
import { MessagingAdapterError } from "../adapter";

function makeVerifyRequest(apiBaseUrl: string, token: string, platformUserId: string): Promise<{ ok: boolean; message?: string }> {
  return new Promise((resolve) => {
    const url = new URL(`${apiBaseUrl}/api/v1/auth/magic-link/verify?token=${encodeURIComponent(token)}&platformUserId=${encodeURIComponent(platformUserId)}`);
    const lib = url.protocol === "https:" ? require("https") : require("http");
    lib.get(url.toString(), (res: any) => {
      let data = "";
      res.on("data", (chunk: string) => { data += chunk; });
      res.on("end", () => {
        try {
          const body = JSON.parse(data);
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, message: body.message ?? body.error });
        } catch {
          resolve({ ok: false, message: "Unexpected response from server" });
        }
      });
    }).on("error", () => {
      resolve({ ok: false, message: "Failed to reach verification server" });
    });
  });
}

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
    private readonly secretToken: string = process.env.TELEGRAM_WEBHOOK_SECRET ?? "",
    private readonly apiBaseUrl: string = process.env.API_BASE_URL ?? "http://localhost:3000"
  ) {
    this.bot = new Telegraf(this.botToken);

    this.bot.command("start", async (ctx) => {
      const args = (ctx.message as any).text?.split(" ") ?? [];
      const token = args[1];
      const platformUserId = String(ctx.from.id);

      if (!token) {
        await ctx.reply("Welcome! To link your Telegram account, please generate a magic link from the web app settings.");
        return;
      }

      const result = await makeVerifyRequest(this.apiBaseUrl, token, platformUserId);
      if (result.ok) {
        await ctx.reply("Your Telegram account is now linked to your web account!");
      } else {
        await ctx.reply(`Failed to link account: ${result.message ?? "Invalid or expired link."}`);
      }
    });

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
