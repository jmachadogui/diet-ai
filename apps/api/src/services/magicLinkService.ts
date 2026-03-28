import crypto from "crypto";
import {
  createToken,
  findValidToken,
  markTokenUsed,
  upsertIdentity,
} from "@diet-ai/db";
import { BadRequestError } from "../middleware/errorHandler";

export async function generateMagicLink(
  userId: string,
  platform: string
): Promise<{ token: string; deepLinkUrl: string }> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await createToken({ userId, platform, token, expiresAt });

  const botName = process.env.TELEGRAM_BOT_NAME ?? "YourBotName";
  const deepLinkUrl = `https://t.me/${botName}?start=${token}`;

  return { token, deepLinkUrl };
}

export async function verifyMagicLink(
  token: string,
  platformUserId: string
): Promise<{ userId: string; platform: string }> {
  const record = await findValidToken(token);

  if (!record) {
    throw new BadRequestError("Invalid, expired, or already used token");
  }

  await markTokenUsed(record.id);

  await upsertIdentity({
    platform: record.platform,
    platformUserId,
    userId: record.userId,
    linkedAt: new Date(),
    lastSeenAt: new Date(),
  });

  return { userId: record.userId, platform: record.platform };
}
