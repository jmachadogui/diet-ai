import { createMealWithItems, findMealsByDay, findUserById } from "@diet-ai/db";
import type { Meal, Prisma } from "@diet-ai/db";
import type { NutritionResult } from "@diet-ai/shared";
import type { MealOccasion } from "@diet-ai/shared";

interface MealItemInput {
  food_name: string;
  quantity: number;
  unit: string;
  nutrition: NutritionResult;
}

interface CreateMealData {
  userId: string;
  sourceLogId: string;
  occasion: MealOccasion;
  consumedAt: Date;
  items: MealItemInput[];
}

export async function createMealFromItems(data: CreateMealData) {
  const totalCalories = data.items.reduce((sum, i) => sum + i.nutrition.calories, 0);
  const totalProteinG = data.items.reduce((sum, i) => sum + i.nutrition.protein_g, 0);
  const totalCarbsG = data.items.reduce((sum, i) => sum + i.nutrition.carbs_g, 0);
  const totalFatG = data.items.reduce((sum, i) => sum + i.nutrition.fat_g, 0);

  const mealData = {
    userId: data.userId,
    sourceLogId: data.sourceLogId,
    occasion: data.occasion,
    consumedAt: data.consumedAt,
    totalCalories: Math.round(totalCalories),
    totalProteinG: parseFloat(totalProteinG.toFixed(2)),
    totalCarbsG: parseFloat(totalCarbsG.toFixed(2)),
    totalFatG: parseFloat(totalFatG.toFixed(2)),
  };

  const itemsData = data.items.map((item) => ({
    foodName: item.food_name,
    quantity: item.quantity,
    unit: item.unit,
    calories: item.nutrition.calories,
    proteinG: item.nutrition.protein_g,
    carbsG: item.nutrition.carbs_g,
    fatG: item.nutrition.fat_g,
    nutritionApi: "fatsecret",
    apiRefId: item.nutrition.api_ref_id,
    apiResponseSnapshot: item.nutrition.api_response_snapshot as Prisma.InputJsonValue,
    resolutionConfidence: item.nutrition.resolution_confidence,
  }));

  return createMealWithItems(mealData, itemsData);
}

export async function getDailySummary(userId: string, date: Date) {
  const meals = await findMealsByDay(userId, date);
  const user = await findUserById(userId);

  const totalCalories = meals.reduce((sum: number, m: Meal) => sum + (m.totalCalories ?? 0), 0);
  const totalProteinG = meals.reduce((sum: number, m: Meal) => sum + (m.totalProteinG ?? 0), 0);
  const totalCarbsG = meals.reduce((sum: number, m: Meal) => sum + (m.totalCarbsG ?? 0), 0);
  const totalFatG = meals.reduce((sum: number, m: Meal) => sum + (m.totalFatG ?? 0), 0);

  return {
    totalCalories,
    totalProteinG: parseFloat(totalProteinG.toFixed(2)),
    totalCarbsG: parseFloat(totalCarbsG.toFixed(2)),
    totalFatG: parseFloat(totalFatG.toFixed(2)),
    dailyCalorieGoal: user?.dailyCalorieGoal ?? null,
  };
}
