import { Router, type Router as ExpressRouter } from "express";
import { z } from "zod";
import { register, login } from "../services/authService";
import { generateMagicLink, verifyMagicLink } from "../services/magicLinkService";
import { BadRequestError } from "../middleware/errorHandler";
import { authenticateJWT } from "../middleware/authenticate";

const router: ExpressRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().int().positive().optional(),
  sex: z.string().optional(),
  heightCm: z.number().positive().optional(),
  weightKg: z.number().positive().optional(),
  activityLevel: z.string().optional(),
  dailyCalorieGoal: z.number().int().positive().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/register", async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new BadRequestError(parsed.error.errors[0]?.message ?? "Invalid input"));
    }
    const result = await register(parsed.data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new BadRequestError(parsed.error.errors[0]?.message ?? "Invalid input"));
    }
    const result = await login(parsed.data);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

const generateSchema = z.object({
  platform: z.enum(["telegram"]),
});

const verifyQuerySchema = z.object({
  token: z.string().min(1),
  platformUserId: z.string().min(1),
});

router.post("/magic-link/generate", authenticateJWT, async (req, res, next) => {
  try {
    const parsed = generateSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new BadRequestError(parsed.error.errors[0]?.message ?? "Invalid input"));
    }
    const result = await generateMagicLink(req.user!.sub, parsed.data.platform);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/magic-link/verify", async (req, res, next) => {
  try {
    const parsed = verifyQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return next(new BadRequestError(parsed.error.errors[0]?.message ?? "Invalid input"));
    }
    await verifyMagicLink(parsed.data.token, parsed.data.platformUserId);
    res.status(200).json({ message: "Account linked successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
