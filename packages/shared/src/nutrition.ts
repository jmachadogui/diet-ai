import { z } from "zod";

export const NutritionQuerySchema = z.object({
  food_name: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().min(1),
});
export type NutritionQuery = z.infer<typeof NutritionQuerySchema>;

export const NutritionResultSchema = z.object({
  food_name: z.string(),
  api_ref_id: z.string(),
  calories: z.number().nonnegative(),
  protein_g: z.number().nonnegative(),
  carbs_g: z.number().nonnegative(),
  fat_g: z.number().nonnegative(),
  api_response_snapshot: z.record(z.unknown()),
  resolution_confidence: z.enum(["high", "medium", "low"]),
});
export type NutritionResult = z.infer<typeof NutritionResultSchema>;
