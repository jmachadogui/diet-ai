import type { MealParseResult, EditInstruction } from "@diet-ai/shared";

export type { MealParseResult, EditInstruction };

export interface MealContext {
  id: string;
  occasion: string;
  consumed_at: string | null;
  items: Array<{ id: string; food_name: string; quantity: number; unit: string }>;
}

export interface LLMProvider {
  parseMessage(rawText: string, todayISO: string, userTime: string): Promise<MealParseResult>;
  editMessage(rawText: string, todayISO: string, mealsContext: MealContext[]): Promise<EditInstruction>;
}

export class LLMParseError extends Error {
  constructor(
    message: string,
    public readonly raw: string
  ) {
    super(message);
    this.name = "LLMParseError";
  }
}
