import type { NutritionQuery, NutritionResult } from "../provider";

export interface FatSecretServing {
  serving_id?: string;
  serving_description?: string;
  serving_size?: string;
  metric_serving_amount?: string;
  metric_serving_unit?: string;
  calories?: string;
  protein?: string;
  carbohydrate?: string;
  fat?: string;
}

const UNIT_TO_GRAMS: Record<string, number | null> = {
  g: 1,
  oz: 28.3495,
  cup: 240,
  tbsp: 15,
  tsp: 5,
  ml: 1,
  slice: 30,
  piece: 100,
  serving: null,
  unit: null,
};

export function normalizeServing(serving: FatSecretServing, query: NutritionQuery): NutritionResult {
  const servingGrams =
    serving.metric_serving_amount && parseFloat(serving.metric_serving_amount) > 0
      ? parseFloat(serving.metric_serving_amount)
      : parseFloat(serving.serving_size ?? "100") || 100;

  const calories = parseFloat(serving.calories ?? "0");
  const protein = parseFloat(serving.protein ?? "0");
  const carbs = parseFloat(serving.carbohydrate ?? "0");
  const fat = parseFloat(serving.fat ?? "0");

  const caloriesPerGram = calories / servingGrams;
  const proteinPerGram = protein / servingGrams;
  const carbsPerGram = carbs / servingGrams;
  const fatPerGram = fat / servingGrams;

  const unitFactor = UNIT_TO_GRAMS[query.unit];
  const userGrams =
    unitFactor === null
      ? query.quantity * servingGrams
      : query.quantity * unitFactor;

  return {
    food_name: query.food_name,
    api_ref_id: "",
    calories: Math.round(caloriesPerGram * userGrams),
    protein_g: parseFloat((proteinPerGram * userGrams).toFixed(2)),
    carbs_g: parseFloat((carbsPerGram * userGrams).toFixed(2)),
    fat_g: parseFloat((fatPerGram * userGrams).toFixed(2)),
    api_response_snapshot: serving as Record<string, unknown>,
    resolution_confidence: "high",
  };
}

export function notFoundResult(food_name: string): NutritionResult {
  return {
    food_name,
    api_ref_id: "",
    calories: 0,
    protein_g: 0,
    carbs_g: 0,
    fat_g: 0,
    api_response_snapshot: {},
    resolution_confidence: "low",
  };
}
