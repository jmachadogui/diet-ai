import type { Job } from "bullmq";
import type { Redis } from "ioredis";
import type { LLMProvider } from "@diet-ai/llm";
import type { NutritionProvider } from "@diet-ai/nutrition";
import { NutritionAPIError } from "@diet-ai/nutrition";
import type { MessagingAdapter } from "@diet-ai/messaging";
import type { Platform, MealParseResult } from "@diet-ai/shared";
import { findIdentity, findLogsByUser } from "@diet-ai/db";
import type { Log } from "@diet-ai/db";
import * as logService from "../services/logService";
import * as mealService from "../services/mealService";

export interface MessageProcessJob {
  userId?: string;
  logId?: string;
  rawText: string;
  platform: Platform;
  platformUserId: string;
  platformMessageId: string;
  messageTimestamp: string;
}

interface ResolveParsedResultOptions {
  userId: string;
  logId: string;
  rawText: string;
  redis: Redis;
  llmProvider: LLMProvider;
  messagingAdapter: MessagingAdapter;
  platformUserId: string;
}

interface ResolveParsedResultReturn {
  result: MealParseResult;
  isFallback: boolean;
}

async function resolveParsedResult(
  opts: ResolveParsedResultOptions
): Promise<ResolveParsedResultReturn> {
  const { userId, logId, rawText, redis, llmProvider, messagingAdapter, platformUserId } = opts;
  const redisKey = `clarification:${userId}`;
  const todayISO = new Date().toISOString().split("T")[0];
  const userTime = new Date().toTimeString().slice(0, 5);

  const stored = await redis.get(redisKey);

  if (stored) {
    const { logId: originalLogId, originalText, question } = JSON.parse(stored) as {
      logId: string;
      originalText: string;
      question: string;
    };

    const combined = `${originalText}\n\nUser clarification: ${rawText}`;
    const result = await llmProvider.parseMessage(combined, todayISO, userTime);

    await redis.del(redisKey);
    await logService.setClarificationResponse(originalLogId, rawText);

    let isFallback = false;
    if (result.needs_clarification) {
      isFallback = true;
      console.warn(
        `[messageProcessor] Re-parse after clarification still needs_clarification for userId=${userId}, question=${question}`
      );
    }

    return { result, isFallback };
  }

  const result = await llmProvider.parseMessage(rawText, todayISO, userTime);

  if (result.needs_clarification) {
    const question = result.clarification_question!;
    await redis.set(
      redisKey,
      JSON.stringify({ logId, originalText: rawText, question }),
      "EX",
      300
    );
    await logService.setClarificationPrompt(logId, question);
    await messagingAdapter.sendMessage({
      platformUserId,
      platform: messagingAdapter.platform as Platform,
      text: question,
    });
  }

  return { result, isFallback: false };
}

async function runLogMealFlow(
  job: Job<MessageProcessJob>,
  result: MealParseResult,
  userId: string,
  logId: string,
  startTime: number,
  messagingAdapter: MessagingAdapter,
  nutritionProvider: NutritionProvider
): Promise<void> {
  const resolvedItems: Array<{
    food_name: string;
    quantity: number;
    unit: string;
    nutrition: Awaited<ReturnType<NutritionProvider["lookup"]>>;
  }> = [];

  for (const item of result.items) {
    const nutrition = await nutritionProvider.lookup({
      food_name: item.food_name,
      quantity: item.quantity,
      unit: item.unit,
    });
    resolvedItems.push({ food_name: item.food_name, quantity: item.quantity, unit: item.unit, nutrition });
  }

  const consumedAt = result.consumed_at
    ? new Date(result.consumed_at)
    : new Date(job.data.messageTimestamp);

  const { meal } = await mealService.createMealFromItems({
    userId,
    sourceLogId: logId,
    occasion: result.meal_occasion,
    consumedAt,
    items: resolvedItems,
  });

  const latencyMs = Date.now() - startTime;
  await logService.updateLogSuccess(logId, {
    llmOutput: result,
    intent: "log_meal",
    latencyMs,
  });

  const totalCal = meal.totalCalories ?? 0;
  const totalProt = meal.totalProteinG ?? 0;
  const totalCarbs = meal.totalCarbsG ?? 0;
  const totalFat = meal.totalFatG ?? 0;
  const itemList = resolvedItems.map((i) => `${i.food_name} (${i.quantity}${i.unit})`).join(", ");
  const reply =
    `Logged: ${itemList}\n` +
    `Calories: ${totalCal} kcal | Protein: ${totalProt}g | Carbs: ${totalCarbs}g | Fat: ${totalFat}g`;

  await messagingAdapter.sendMessage({
    platformUserId: job.data.platformUserId,
    platform: job.data.platform,
    text: reply,
  });
}

async function runEditMealFlow(
  job: Job<MessageProcessJob>,
  logId: string,
  messagingAdapter: MessagingAdapter
): Promise<void> {
  await logService.updateLogSuccess(logId, {
    llmOutput: null,
    intent: "edit_meal",
    latencyMs: 0,
  });
  await messagingAdapter.sendMessage({
    platformUserId: job.data.platformUserId,
    platform: job.data.platform,
    text: "Meal editing is not yet implemented.",
  });
}

async function runSummaryFlow(
  job: Job<MessageProcessJob>,
  logId: string,
  messagingAdapter: MessagingAdapter
): Promise<void> {
  await logService.updateLogSuccess(logId, {
    llmOutput: null,
    intent: "summary",
    latencyMs: 0,
  });
  await messagingAdapter.sendMessage({
    platformUserId: job.data.platformUserId,
    platform: job.data.platform,
    text: "Summary is not yet implemented.",
  });
}

export async function processMessage(
  job: Job<MessageProcessJob>,
  adapters: MessagingAdapter[],
  llmProvider: LLMProvider,
  nutritionProvider: NutritionProvider,
  redis: Redis
): Promise<void> {
  const startTime = Date.now();
  const { rawText, platform, platformUserId, platformMessageId, messageTimestamp } = job.data;

  const messagingAdapter = adapters.find((a) => a.platform === platform);
  if (!messagingAdapter) {
    console.error(`[messageProcessor] No adapter found for platform=${platform}`);
    return;
  }

  const identity = await findIdentity(platform, platformUserId);
  if (!identity) {
    await messagingAdapter.sendMessage({
      platformUserId,
      platform,
      text: "Your account is not linked yet. Please use the magic link from the web app to connect your account.",
    });
    return;
  }

  const userId = identity.userId;

  const redisKey = `clarification:${userId}`;
  const hasClarificationKey = await redis.exists(redisKey);

  if (!hasClarificationKey) {
    const recentLogs = await findLogsByUser(userId, { limit: 1 });
    const pendingLog = recentLogs.find(
      (l: Log) => l.processingStatus === "processing" && l.clarificationPrompt != null
    );
    if (pendingLog) {
      await logService.markLogAbandoned(pendingLog.id);
    }
  }

  const log = await logService.createLog({
    userId,
    platform,
    platformMessageId,
    messageTimestamp: new Date(messageTimestamp),
    rawText,
  });
  const logId = log.id;

  try {
    const { result, isFallback } = await resolveParsedResult({
      userId,
      logId,
      rawText,
      redis,
      llmProvider,
      messagingAdapter,
      platformUserId,
    });

    if (result.needs_clarification && !isFallback) {
      return;
    }

    const intent = result.intent;

    if (intent === "log_meal") {
      await runLogMealFlow(job, result, userId, logId, startTime, messagingAdapter, nutritionProvider);
    } else if (intent === "edit_meal") {
      await runEditMealFlow(job, logId, messagingAdapter);
    } else if (intent === "summary") {
      await runSummaryFlow(job, logId, messagingAdapter);
    } else {
      const latencyMs = Date.now() - startTime;
      await logService.updateLogSuccess(logId, { llmOutput: result, intent: "other", latencyMs });
      await messagingAdapter.sendMessage({
        platformUserId,
        platform,
        text: "I can help you log meals, edit previous entries, or show your daily summary.",
      });
    }
  } catch (err) {
    if (err instanceof NutritionAPIError) {
      await logService.updateLogFailed(logId, {
        errorCode: "NUTRITION_API_ERROR",
        errorMessage: err.message,
      });
      await messagingAdapter.sendMessage({
        platformUserId,
        platform,
        text: "Unable to fetch nutrition data right now. Please try again later.",
      });
      return;
    }

    const errorMessage = err instanceof Error ? err.message : String(err);
    await logService.updateLogFailed(logId, {
      errorCode: "INTERNAL_ERROR",
      errorMessage,
    });
    await messagingAdapter.sendMessage({
      platformUserId,
      platform,
      text: "Something went wrong processing your message. Please try again.",
    });
  }
}
