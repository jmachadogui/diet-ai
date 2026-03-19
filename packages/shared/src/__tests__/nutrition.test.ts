import { NutritionQuerySchema, NutritionResultSchema } from "../nutrition";

describe("NutritionQuerySchema", () => {
  it("accepts valid query", () => {
    expect(NutritionQuerySchema.safeParse({ food_name: "apple", quantity: 1, unit: "piece" }).success).toBe(true);
  });

  it("rejects empty food_name", () => {
    expect(NutritionQuerySchema.safeParse({ food_name: "", quantity: 1, unit: "piece" }).success).toBe(false);
  });

  it("rejects negative quantity", () => {
    expect(NutritionQuerySchema.safeParse({ food_name: "apple", quantity: -1, unit: "piece" }).success).toBe(false);
  });
});

describe("NutritionResultSchema", () => {
  const base = {
    food_name: "apple",
    api_ref_id: "fs-123",
    calories: 0,
    protein_g: 0,
    carbs_g: 0,
    fat_g: 0,
    api_response_snapshot: { raw: true },
    resolution_confidence: "high",
  };

  it("accepts valid result with all macro fields as 0", () => {
    expect(NutritionResultSchema.safeParse(base).success).toBe(true);
  });

  it("rejects negative calories", () => {
    expect(NutritionResultSchema.safeParse({ ...base, calories: -1 }).success).toBe(false);
  });

  it("rejects invalid resolution_confidence", () => {
    expect(NutritionResultSchema.safeParse({ ...base, resolution_confidence: "very_high" }).success).toBe(false);
  });
});
