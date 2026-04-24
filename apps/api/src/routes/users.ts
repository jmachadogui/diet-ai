import { Router, type Router as ExpressRouter } from "express";
import { z } from "zod";
import { authenticateJWT } from "../middleware/authenticate";
import { BadRequestError } from "../middleware/errorHandler";
import { getProfile, updateProfile } from "../services/userService";

const router: ExpressRouter = Router();

const updateProfileSchema = z.object({
  age: z.number().int().positive().optional(),
  sex: z.string().optional(),
  heightCm: z.number().positive().optional(),
  weightKg: z.number().positive().optional(),
  activityLevel: z.string().optional(),
  dailyCalorieGoal: z.number().int().positive().optional(),
});

router.use(authenticateJWT);

router.get("/me", async (req, res, next) => {
  try {
    const user = await getProfile(req.user!.sub);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

router.patch("/me", async (req, res, next) => {
  try {
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new BadRequestError(parsed.error.errors[0]?.message ?? "Invalid input"));
    }
    const user = await updateProfile(req.user!.sub, parsed.data);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

export default router;
