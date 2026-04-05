import axios from "axios";
import type { PrismaClient } from "@diet-ai/db";
import type { NutritionProvider, NutritionQuery, NutritionResult } from "../provider";
import { NutritionAPIError } from "../provider";
import { getAccessToken } from "./tokenManager";
import { normalizeServing, notFoundResult, type FatSecretServing } from "./normalize";
import { computeNormalizedQueryHash } from "./cacheKey";

const FATSECRET_API_URL = "https://platform.fatsecret.com/rest/server.api";

function checkFatSecretError(data: unknown): void {
  const error = (data as Record<string, unknown>)?.error as Record<string, unknown> | undefined;
  if (!error) return;
  const code = error.code as number;
  const message = error.message as string;
  if (code === 21) {
    throw new NutritionAPIError(
      `FatSecret rejected the request: IP address not whitelisted (code 21). Add your server's public IP to the FatSecret developer portal. Original message: ${message}`,
      error
    );
  }
  throw new NutritionAPIError(`FatSecret API error (code ${code}): ${message}`, error);
}

export class FatSecretProvider implements NutritionProvider {
  readonly vendorName = "fatsecret";

  constructor(
    private readonly prisma: PrismaClient,
    private readonly clientId: string = process.env.FATSECRET_CLIENT_ID ?? "",
    private readonly clientSecret: string = process.env.FATSECRET_CLIENT_SECRET ?? "",
    private readonly cacheTtlDays: number = parseInt(process.env.NUTRITION_CACHE_TTL_DAYS ?? "7", 10)
  ) {}

  async lookup(query: NutritionQuery): Promise<NutritionResult> {
    const hash = computeNormalizedQueryHash(query.food_name, query.unit);

    const cached = await this.prisma.apiCache.findUnique({
      where: { normalizedQueryHash: hash },
    });

    if (cached && cached.expiresAt > new Date()) {
      return cached.nutritionData as NutritionResult;
    }

    const token = await getAccessToken(this.clientId, this.clientSecret);

    let foodId: string;
    try {
      const searchResponse = await axios.get(FATSECRET_API_URL, {
        params: {
          method: "foods.search",
          search_expression: query.food_name,
          format: "json",
          max_results: 1,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      checkFatSecretError(searchResponse.data);
      const foods = searchResponse.data?.foods?.food;
      if (!foods) {
        return notFoundResult(query.food_name);
      }

      const food = Array.isArray(foods) ? foods[0] : foods;
      foodId = food.food_id as string;
    } catch (err) {
      if (err instanceof NutritionAPIError) throw err;
      if (axios.isAxiosError(err) && err.response) {
        throw new NutritionAPIError(`FatSecret API error: ${err.response.status}`, err);
      }
      throw new NutritionAPIError("FatSecret unreachable", err);
    }

    let serving: FatSecretServing;
    let rawFood: Record<string, unknown>;
    try {
      const getResponse = await axios.get(FATSECRET_API_URL, {
        params: {
          method: "food.get",
          food_id: foodId,
          format: "json",
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      checkFatSecretError(getResponse.data);
      rawFood = getResponse.data?.food as Record<string, unknown>;
      const servings = (rawFood?.servings as Record<string, unknown>)?.serving;
      serving = (Array.isArray(servings) ? servings[0] : servings) as FatSecretServing;
    } catch (err) {
      if (err instanceof NutritionAPIError) throw err;
      if (axios.isAxiosError(err) && err.response) {
        throw new NutritionAPIError(`FatSecret API error: ${err.response.status}`, err);
      }
      throw new NutritionAPIError("FatSecret unreachable", err);
    }

    const result: NutritionResult = {
      ...normalizeServing(serving, query),
      api_ref_id: foodId,
      api_response_snapshot: rawFood,
    };

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.cacheTtlDays);

    await this.prisma.apiCache.upsert({
      where: { normalizedQueryHash: hash },
      update: { nutritionData: result as object, fetchedAt: new Date(), expiresAt },
      create: {
        vendor: this.vendorName,
        queryString: query.food_name,
        normalizedQueryHash: hash,
        nutritionData: result as object,
        fetchedAt: new Date(),
        expiresAt,
      },
    });

    return result;
  }
}
