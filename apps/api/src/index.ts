import express, { type Express } from "express";
import { prisma } from "@diet-ai/db";
import { createLLMProvider } from "@diet-ai/llm";
import { createNutritionProvider } from "@diet-ai/nutrition";
import { createMessagingAdapters } from "@diet-ai/messaging";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { redisConnection } from "./queue/connection";
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

for (const adapter of messagingAdapters) {
  adapter.registerWebhook(app);
}

app.use(errorHandler);

export { app, llmProvider, nutritionProvider, messagingAdapters, redisConnection };

if (require.main === module) {
  const PORT = Number(process.env.PORT ?? 3000);
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}
