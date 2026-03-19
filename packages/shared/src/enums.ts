import { z } from "zod";

export const PlatformEnum = z.enum(["telegram", "whatsapp", "discord"]);
export type Platform = z.infer<typeof PlatformEnum>;

export const MealOccasionEnum = z.enum([
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "unknown",
]);
export type MealOccasion = z.infer<typeof MealOccasionEnum>;

export const IntentEnum = z.enum([
  "log_meal",
  "edit_meal",
  "summary",
  "other",
]);
export type Intent = z.infer<typeof IntentEnum>;
