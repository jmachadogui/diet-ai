import { createHash } from "crypto";

export function computeNormalizedQueryHash(food_name: string, unit: string): string {
  const normalized = `${food_name.toLowerCase().trim()}|${unit.toLowerCase().trim()}`;
  return createHash("sha256").update(normalized).digest("hex");
}
