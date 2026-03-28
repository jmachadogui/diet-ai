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
