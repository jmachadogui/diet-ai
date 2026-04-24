import { Worker } from "bullmq";
import type { LLMProvider } from "@diet-ai/llm";
import type { NutritionProvider } from "@diet-ai/nutrition";
import type { MessagingAdapter } from "@diet-ai/messaging";
import type { Redis } from "ioredis";
import { processMessage, type MessageProcessJob } from "./messageProcessor";

export function startWorkers(
  adapters: MessagingAdapter[],
  llmProvider: LLMProvider,
  nutritionProvider: NutritionProvider,
  redis: Redis
): Worker {
  const concurrency = parseInt(process.env.QUEUE_CONCURRENCY ?? "5", 10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connection = redis as any;

  const worker = new Worker<MessageProcessJob>(
    "message-process",
    (job) => processMessage(job, adapters, llmProvider, nutritionProvider, redis),
    {
      connection,
      concurrency,
    }
  );

  worker.on("failed", (job, err) => {
    console.error(`[worker] Job ${job?.id} failed:`, err.message);
  });

  return worker;
}
