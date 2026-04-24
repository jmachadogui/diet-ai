import { findUserById, updateUser, recordWeight } from "@diet-ai/db";
import type { User } from "@diet-ai/db";
import { NotFoundError } from "../middleware/errorHandler";

export type SafeUser = Omit<User, "passwordHash">;

export interface UpdateProfileInput {
  age?: number;
  sex?: string;
  heightCm?: number;
  weightKg?: number;
  activityLevel?: string;
  dailyCalorieGoal?: number;
}

function sanitizeUser(user: User): SafeUser {
  const { passwordHash: _omit, ...safe } = user;
  return safe;
}

export async function getProfile(userId: string): Promise<SafeUser> {
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return sanitizeUser(user);
}

export async function updateProfile(userId: string, input: UpdateProfileInput): Promise<SafeUser> {
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (input.weightKg !== undefined) {
    await recordWeight(userId, input.weightKg, "web");
  }

  const updated = await updateUser(userId, input);
  return sanitizeUser(updated);
}
