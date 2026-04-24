import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "@diet-ai/db";
import type { User } from "@diet-ai/db";
import { ConflictError, UnauthorizedError } from "../middleware/errorHandler";

export interface RegisterInput {
  email: string;
  password: string;
  age?: number;
  sex?: string;
  heightCm?: number;
  weightKg?: number;
  activityLevel?: string;
  dailyCalorieGoal?: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export function generateToken(user: Pick<User, "id" | "email">): string {
  return jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET ?? "",
    { expiresIn: "7d" }
  );
}

export async function register(input: RegisterInput): Promise<{ token: string; user: Pick<User, "id" | "email"> }> {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new ConflictError("Email already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const user = await createUser({
    email: input.email,
    passwordHash,
    age: input.age,
    sex: input.sex,
    heightCm: input.heightCm,
    weightKg: input.weightKg,
    activityLevel: input.activityLevel,
    dailyCalorieGoal: input.dailyCalorieGoal,
  });

  const token = generateToken(user);
  return { token, user: { id: user.id, email: user.email } };
}

export async function login(input: LoginInput): Promise<{ token: string }> {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = generateToken(user);
  return { token };
}
