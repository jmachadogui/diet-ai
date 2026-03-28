import { createLog as dbCreateLog, updateLog } from "@diet-ai/db";
import type { Platform } from "@diet-ai/shared";

interface CreateLogData {
  userId: string;
  platform: Platform;
  platformMessageId?: string;
  messageTimestamp?: Date;
  rawText: string;
}

interface UpdateLogSuccessData {
  llmOutput: unknown;
  intent: string;
  latencyMs: number;
}

interface UpdateLogFailedData {
  errorCode: string;
  errorMessage: string;
}

export function createLog(data: CreateLogData) {
  return dbCreateLog({
    user: { connect: { id: data.userId } },
    platform: data.platform,
    platformMessageId: data.platformMessageId,
    messageTimestamp: data.messageTimestamp,
    rawText: data.rawText,
    processingStatus: "processing",
  });
}

export function updateLogSuccess(logId: string, data: UpdateLogSuccessData) {
  return updateLog(logId, {
    processingStatus: "success",
    llmOutput: data.llmOutput as never,
    intent: data.intent,
    latencyMs: data.latencyMs,
  });
}

export function updateLogFailed(logId: string, data: UpdateLogFailedData) {
  return updateLog(logId, {
    processingStatus: "failed",
    errorCode: data.errorCode,
    errorMessage: data.errorMessage,
  });
}

export function setClarificationPrompt(logId: string, prompt: string) {
  return updateLog(logId, { clarificationPrompt: prompt });
}

export function setClarificationResponse(logId: string, response: string) {
  return updateLog(logId, { clarificationResponse: response });
}

export function markLogAbandoned(logId: string) {
  return updateLog(logId, { processingStatus: "abandoned" });
}
