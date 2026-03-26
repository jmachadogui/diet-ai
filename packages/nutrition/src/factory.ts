import type { PrismaClient } from "@diet-ai/db";
import { FatSecretProvider } from "./fatsecret/provider";
import type { NutritionProvider } from "./provider";

export function createNutritionProvider(prisma: PrismaClient): NutritionProvider {
  const provider = process.env.NUTRITION_PROVIDER ?? "fatsecret";
  if (provider === "fatsecret") {
    return new FatSecretProvider(prisma);
  }
  throw new Error(`Unknown NUTRITION_PROVIDER: "${provider}"`);
}
