import type { PrismaClient } from "@diet-ai/db";
import { createNutritionProvider } from "../factory";
import { FatSecretProvider } from "../fatsecret/provider";

const mockPrisma = {} as unknown as PrismaClient;

describe("createNutritionProvider", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns FatSecretProvider when NUTRITION_PROVIDER=fatsecret", () => {
    process.env.NUTRITION_PROVIDER = "fatsecret";
    const provider = createNutritionProvider(mockPrisma);
    expect(provider).toBeInstanceOf(FatSecretProvider);
  });

  it("returns FatSecretProvider when NUTRITION_PROVIDER is unset", () => {
    delete process.env.NUTRITION_PROVIDER;
    const provider = createNutritionProvider(mockPrisma);
    expect(provider).toBeInstanceOf(FatSecretProvider);
  });

  it("throws for unknown NUTRITION_PROVIDER value", () => {
    process.env.NUTRITION_PROVIDER = "unknown";
    expect(() => createNutritionProvider(mockPrisma)).toThrow(
      'Unknown NUTRITION_PROVIDER: "unknown"'
    );
  });
});
