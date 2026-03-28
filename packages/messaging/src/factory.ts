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
