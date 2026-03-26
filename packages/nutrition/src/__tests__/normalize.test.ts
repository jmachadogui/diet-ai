import { normalizeServing, notFoundResult } from "../fatsecret/normalize";
import type { FatSecretServing } from "../fatsecret/normalize";
import type { NutritionQuery } from "../provider";

const baseServing: FatSecretServing = {
  metric_serving_amount: "100",
  metric_serving_unit: "g",
  calories: "200",
  protein: "30",
  carbohydrate: "0",
  fat: "10",
};

describe("normalizeServing", () => {
  it("200g item with a per-100g serving returns doubled macro values", () => {
    const query: NutritionQuery = { food_name: "chicken", quantity: 200, unit: "g" };
    const result = normalizeServing(baseServing, query);
    expect(result.calories).toBe(400);
    expect(result.protein_g).toBe(60);
    expect(result.carbs_g).toBe(0);
    expect(result.fat_g).toBe(20);
    expect(result.resolution_confidence).toBe("high");
  });

  it("1 oz item applies correct gram conversion (~28.35g)", () => {
    const query: NutritionQuery = { food_name: "chicken", quantity: 1, unit: "oz" };
    const result = normalizeServing(baseServing, query);
    expect(result.calories).toBe(Math.round((200 / 100) * 28.3495));
    expect(result.protein_g).toBeCloseTo((30 / 100) * 28.3495, 1);
  });

  it("1 serving uses the serving's own gram weight", () => {
    const serving: FatSecretServing = {
      metric_serving_amount: "150",
      calories: "300",
      protein: "20",
      carbohydrate: "40",
      fat: "5",
    };
    const query: NutritionQuery = { food_name: "pasta", quantity: 1, unit: "serving" };
    const result = normalizeServing(serving, query);
    expect(result.calories).toBe(300);
    expect(result.protein_g).toBeCloseTo(20, 1);
    expect(result.carbs_g).toBeCloseTo(40, 1);
    expect(result.fat_g).toBeCloseTo(5, 1);
  });

  it("2 servings doubles the serving values", () => {
    const serving: FatSecretServing = {
      metric_serving_amount: "150",
      calories: "300",
      protein: "20",
      carbohydrate: "40",
      fat: "5",
    };
    const query: NutritionQuery = { food_name: "pasta", quantity: 2, unit: "serving" };
    const result = normalizeServing(serving, query);
    expect(result.calories).toBe(600);
    expect(result.protein_g).toBeCloseTo(40, 1);
  });

  it("falls back to serving_size when metric_serving_amount is missing", () => {
    const serving: FatSecretServing = {
      serving_size: "100",
      calories: "150",
      protein: "10",
      carbohydrate: "20",
      fat: "5",
    };
    const query: NutritionQuery = { food_name: "bread", quantity: 100, unit: "g" };
    const result = normalizeServing(serving, query);
    expect(result.calories).toBe(150);
    expect(result.protein_g).toBeCloseTo(10, 1);
    expect(result.carbs_g).toBeCloseTo(20, 1);
    expect(result.fat_g).toBeCloseTo(5, 1);
  });

  it("unit type uses serving gram weight", () => {
    const serving: FatSecretServing = {
      metric_serving_amount: "120",
      calories: "240",
      protein: "15",
      carbohydrate: "30",
      fat: "8",
    };
    const query: NutritionQuery = { food_name: "egg", quantity: 1, unit: "unit" };
    const result = normalizeServing(serving, query);
    expect(result.calories).toBe(240);
  });
});

describe("notFoundResult", () => {
  it("returns zeroed macros with resolution_confidence low", () => {
    const result = notFoundResult("mystery food");
    expect(result.food_name).toBe("mystery food");
    expect(result.calories).toBe(0);
    expect(result.protein_g).toBe(0);
    expect(result.carbs_g).toBe(0);
    expect(result.fat_g).toBe(0);
    expect(result.resolution_confidence).toBe("low");
    expect(result.api_ref_id).toBe("");
  });
});
