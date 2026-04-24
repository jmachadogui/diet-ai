import { Router, type Router as ExpressRouter } from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { NotImplementedError } from "../middleware/errorHandler";

const router: ExpressRouter = Router();

router.use(authenticateJWT);
router.get("/", (_req, _res, next) => next(new NotImplementedError()));
router.get("/:mealId", (_req, _res, next) => next(new NotImplementedError()));
router.patch("/:mealId/items/:itemId", (_req, _res, next) => next(new NotImplementedError()));
router.delete("/:mealId/items/:itemId", (_req, _res, next) => next(new NotImplementedError()));
router.delete("/:mealId", (_req, _res, next) => next(new NotImplementedError()));

export default router;
