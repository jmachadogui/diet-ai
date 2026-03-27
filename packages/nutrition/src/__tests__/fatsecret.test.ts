import axios from "axios";
import type { PrismaClient } from "@diet-ai/db";
import { FatSecretProvider } from "../fatsecret/provider";
import { NutritionAPIError } from "../provider";

jest.mock("axios");
jest.mock("../fatsecret/tokenManager", () => ({
  getAccessToken: jest.fn().mockResolvedValue("fake-token"),
  resetTokenCache: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeMockPrisma = (cachedEntry: unknown = null) =>
  ({
    apiCache: {
      findUnique: jest.fn().mockResolvedValue(cachedEntry),
      upsert: jest.fn().mockResolvedValue({}),
    },
  }) as unknown as PrismaClient;

const searchResponse = {
  data: {
    foods: {
      food: { food_id: "123", food_name: "Grilled Chicken" },
    },
  },
};

const getResponse = {
  data: {
    food: {
      food_id: "123",
      food_name: "Grilled Chicken",
      servings: {
        serving: {
          metric_serving_amount: "100",
          metric_serving_unit: "g",
          calories: "165",
          protein: "31",
          carbohydrate: "0",
          fat: "3.6",
        },
      },
    },
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("FatSecretProvider.lookup", () => {
  it("cache hit — FatSecret API is never called", async () => {
    const cachedResult = {
      food_name: "chicken",
      api_ref_id: "123",
      calories: 330,
      protein_g: 62,
      carbs_g: 0,
      fat_g: 7.2,
      api_response_snapshot: {},
      resolution_confidence: "high",
    };
    const prisma = makeMockPrisma({
      nutritionData: cachedResult,
      expiresAt: new Date(Date.now() + 86400_000),
    });

    const provider = new FatSecretProvider(prisma, "id", "secret");
    const result = await provider.lookup({ food_name: "chicken", quantity: 200, unit: "g" });

    expect(result).toEqual(cachedResult);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it("cache miss — FatSecret API called and result written to cache", async () => {
    const prisma = makeMockPrisma(null);
    mockedAxios.get
      .mockResolvedValueOnce(searchResponse)
      .mockResolvedValueOnce(getResponse);

    const provider = new FatSecretProvider(prisma, "id", "secret");
    const result = await provider.lookup({ food_name: "chicken", quantity: 200, unit: "g" });

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect((prisma.apiCache.upsert as jest.Mock)).toHaveBeenCalledTimes(1);
    expect(result.resolution_confidence).toBe("high");
    expect(result.api_ref_id).toBe("123");
  });

  it("FatSecret unavailable — NutritionAPIError thrown", async () => {
    const prisma = makeMockPrisma(null);
    mockedAxios.get.mockRejectedValueOnce(new Error("ECONNREFUSED"));

    const provider = new FatSecretProvider(prisma, "id", "secret");
    await expect(
      provider.lookup({ food_name: "chicken", quantity: 100, unit: "g" })
    ).rejects.toThrow(NutritionAPIError);
  });

  it("food not found — resolution_confidence low with zeroed macros", async () => {
    const prisma = makeMockPrisma(null);
    mockedAxios.get.mockResolvedValueOnce({ data: { foods: {} } });

    const provider = new FatSecretProvider(prisma, "id", "secret");
    const result = await provider.lookup({ food_name: "xyzunknownfood", quantity: 100, unit: "g" });

    expect(result.resolution_confidence).toBe("low");
    expect(result.calories).toBe(0);
    expect(result.protein_g).toBe(0);
    expect(result.carbs_g).toBe(0);
    expect(result.fat_g).toBe(0);
    expect((prisma.apiCache.upsert as jest.Mock)).not.toHaveBeenCalled();
  });

  it("quantity scaling — 200g with per-100g serving returns doubled macros", async () => {
    const prisma = makeMockPrisma(null);
    mockedAxios.get
      .mockResolvedValueOnce(searchResponse)
      .mockResolvedValueOnce(getResponse);

    const provider = new FatSecretProvider(prisma, "id", "secret");
    const result = await provider.lookup({ food_name: "chicken", quantity: 200, unit: "g" });

    expect(result.calories).toBe(330);
    expect(result.protein_g).toBeCloseTo(62, 0);
    expect(result.fat_g).toBeCloseTo(7.2, 1);
  });

  it("expired cache entry — FatSecret API is called", async () => {
    const prisma = makeMockPrisma({
      nutritionData: {},
      expiresAt: new Date(Date.now() - 1000),
    });
    mockedAxios.get
      .mockResolvedValueOnce(searchResponse)
      .mockResolvedValueOnce(getResponse);

    const provider = new FatSecretProvider(prisma, "id", "secret");
    await provider.lookup({ food_name: "chicken", quantity: 100, unit: "g" });

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
});
