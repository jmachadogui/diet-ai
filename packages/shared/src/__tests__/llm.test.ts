import { MealParseResultSchema, EditInstructionSchema } from "../llm";

const validLogMealResult = {
  intent: "log_meal",
  needs_clarification: false,
  clarification_question: null,
  meal_occasion: "breakfast",
  consumed_at: "2024-01-01T08:00:00+00:00",
  items: [{ food_name: "banana", quantity: 1, unit: "piece" }],
};

describe("MealParseResultSchema", () => {
  it("accepts valid log_meal result with items", () => {
    expect(MealParseResultSchema.safeParse(validLogMealResult).success).toBe(true);
  });

  it("accepts valid summary result with empty items", () => {
    const input = {
      ...validLogMealResult,
      intent: "summary",
      items: [],
    };
    expect(MealParseResultSchema.safeParse(input).success).toBe(true);
  });

  it("accepts needs_clarification true with non-null clarification_question", () => {
    const input = {
      ...validLogMealResult,
      needs_clarification: true,
      clarification_question: "Did you mean grilled or fried?",
    };
    expect(MealParseResultSchema.safeParse(input).success).toBe(true);
  });

  it("rejects needs_clarification true with null clarification_question", () => {
    const input = {
      ...validLogMealResult,
      needs_clarification: true,
      clarification_question: null,
    };
    expect(MealParseResultSchema.safeParse(input).success).toBe(false);
  });

  it("rejects needs_clarification false with non-null clarification_question", () => {
    const input = {
      ...validLogMealResult,
      needs_clarification: false,
      clarification_question: "Some question?",
    };
    expect(MealParseResultSchema.safeParse(input).success).toBe(false);
  });

  it("rejects missing intent field", () => {
    const { intent, ...rest } = validLogMealResult;
    expect(MealParseResultSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects item with invalid unit", () => {
    const input = {
      ...validLogMealResult,
      items: [{ food_name: "milk", quantity: 1, unit: "litre" }],
    };
    expect(MealParseResultSchema.safeParse(input).success).toBe(false);
  });

  it("rejects item with non-positive quantity", () => {
    const input = {
      ...validLogMealResult,
      items: [{ food_name: "apple", quantity: 0, unit: "piece" }],
    };
    expect(MealParseResultSchema.safeParse(input).success).toBe(false);
  });
});

const validEditInstruction = {
  intent: "edit_meal",
  target_meal_id: null,
  target_occasion: "breakfast",
  target_date: null,
  operations: [{ type: "remove_item", item_ref: "banana", new_quantity: null, new_unit: null, food_name: null }],
  needs_clarification: false,
  clarification_question: null,
};

describe("EditInstructionSchema", () => {
  it("accepts valid edit with one remove_item operation", () => {
    expect(EditInstructionSchema.safeParse(validEditInstruction).success).toBe(true);
  });

  it("accepts valid edit with multiple mixed operations", () => {
    const input = {
      ...validEditInstruction,
      operations: [
        { type: "remove_item", item_ref: "banana", new_quantity: null, new_unit: null, food_name: null },
        { type: "add_item", item_ref: null, new_quantity: 100, new_unit: "g", food_name: "oats" },
        { type: "update_quantity", item_ref: "eggs", new_quantity: 2, new_unit: "piece", food_name: null },
      ],
    };
    expect(EditInstructionSchema.safeParse(input).success).toBe(true);
  });

  it("rejects empty operations array", () => {
    const input = { ...validEditInstruction, operations: [] };
    expect(EditInstructionSchema.safeParse(input).success).toBe(false);
  });

  it("rejects intent other than edit_meal", () => {
    const input = { ...validEditInstruction, intent: "log_meal" };
    expect(EditInstructionSchema.safeParse(input).success).toBe(false);
  });

  it("rejects target_occasion of unknown", () => {
    const input = { ...validEditInstruction, target_occasion: "unknown" };
    expect(EditInstructionSchema.safeParse(input).success).toBe(false);
  });

  it("rejects needs_clarification true with null clarification_question", () => {
    const input = { ...validEditInstruction, needs_clarification: true, clarification_question: null };
    expect(EditInstructionSchema.safeParse(input).success).toBe(false);
  });

  it("rejects needs_clarification false with non-null clarification_question", () => {
    const input = { ...validEditInstruction, needs_clarification: false, clarification_question: "Which meal?" };
    expect(EditInstructionSchema.safeParse(input).success).toBe(false);
  });
});
