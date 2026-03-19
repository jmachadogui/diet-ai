import { z } from "zod";
import { PlatformEnum } from "./enums";

export const IncomingMessageSchema = z.object({
  platformMessageId: z.string(),
  platformUserId: z.string(),
  platform: PlatformEnum,
  text: z.string(),
  timestamp: z.coerce.date(),
});
export type IncomingMessage = z.infer<typeof IncomingMessageSchema>;

export const OutgoingMessageSchema = z.object({
  platformUserId: z.string(),
  platform: PlatformEnum,
  text: z.string(),
});
export type OutgoingMessage = z.infer<typeof OutgoingMessageSchema>;
