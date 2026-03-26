import type { NutritionQuery, NutritionResult } from "@diet-ai/shared";

export type { NutritionQuery, NutritionResult };

export interface NutritionProvider {
  vendorName: string;
  lookup(query: NutritionQuery): Promise<NutritionResult>;
}

export class NutritionAPIError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "NutritionAPIError";
  }
}
