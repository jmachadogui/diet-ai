import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import express, { type Express } from "express";
import { Queue } from "bullmq";
import { prisma } from "@diet-ai/db";
import { createLLMProvider } from "@diet-ai/llm";
import { createNutritionProvider } from "@diet-ai/nutrition";
import { createMessagingAdapters } from "@diet-ai/messaging";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { redisConnection } from "./queue/connection";
import { startWorkers } from "./workers";
import type { MessageProcessJob } from "./workers/messageProcessor";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import mealsRouter from "./routes/meals";
import logsRouter from "./routes/logs";

const app: Express = express();

app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/meals", mealsRouter);
app.use("/api/v1/logs", logsRouter);

const llmProvider = createLLMProvider();
const nutritionProvider = createNutritionProvider(prisma);
const messagingAdapters = createMessagingAdapters();

const messageQueue = new Queue<MessageProcessJob, void, "message-process">("message-process", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connection: redisConnection as any,
});

for (const adapter of messagingAdapters) {
  adapter.registerWebhook(app);
  adapter.onMessage(async (msg) => {
    await messageQueue.add("message-process", {
      rawText: msg.text,
      platform: msg.platform,
      platformUserId: msg.platformUserId,
      platformMessageId: msg.platformMessageId,
      messageTimestamp: msg.timestamp.toISOString(),
    });
  });
}

app.use(errorHandler);

export { app, llmProvider, nutritionProvider, messagingAdapters, redisConnection };

if (require.main === module) {
  const PORT = Number(process.env.PORT ?? 3000);
  startWorkers(messagingAdapters, llmProvider, nutritionProvider, redisConnection);
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}
