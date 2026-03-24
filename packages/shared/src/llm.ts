import { z } from "zod";
import { IntentEnum, MealOccasionEnum } from "./enums";

export const MealItemSchema = z.object({
  food_name: z.string(),
  quantity: z.number().positive(),
  unit: z.enum(["g", "ml", "oz", "cup", "tbsp", "tsp", "slice", "piece", "serving", "unit"]),
});
export type MealItem = z.infer<typeof MealItemSchema>;

export const MealParseResultSchema = z
  .object({
    intent: IntentEnum,
    needs_clarification: z.boolean(),
    clarification_question: z.string().nullable(),
    meal_occasion: MealOccasionEnum,
    consumed_at: z.string().datetime({ offset: true }).nullable(),
    items: z.array(MealItemSchema),
  })
  .superRefine((val, ctx) => {
    if (val.needs_clarification && val.clarification_question === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clarification_question must not be null when needs_clarification is true",
        path: ["clarification_question"],
      });
    }
    if (!val.needs_clarification && val.clarification_question !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clarification_question must be null when needs_clarification is false",
        path: ["clarification_question"],
      });
    }
  });
export type MealParseResult = z.infer<typeof MealParseResultSchema>;

export const EditOperationSchema = z.object({
  type: z.enum(["remove_item", "update_quantity", "add_item"]),
  item_ref: z.string().nullable(),
  new_quantity: z.number().positive().nullable(),
  new_unit: z.string().nullable(),
  food_name: z.string().nullable(),
});
export type EditOperation = z.infer<typeof EditOperationSchema>;

export const EditInstructionSchema = z
  .object({
    intent: z.literal("edit_meal"),
    target_meal_id: z.string().nullable(),
    target_occasion: MealOccasionEnum.exclude(["unknown"]).nullable(),
    target_date: z.string().nullable(),
    operations: z.array(EditOperationSchema).min(1),
    needs_clarification: z.boolean(),
    clarification_question: z.string().nullable(),
  })
  .superRefine((val, ctx) => {
    if (val.needs_clarification && val.clarification_question === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clarification_question must not be null when needs_clarification is true",
        path: ["clarification_question"],
      });
    }
    if (!val.needs_clarification && val.clarification_question !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clarification_question must be null when needs_clarification is false",
        path: ["clarification_question"],
      });
    }
  });
export type EditInstruction = z.infer<typeof EditInstructionSchema>;
