import { Router, type Router as ExpressRouter } from "express";
import { NotImplementedError } from "../middleware/errorHandler";

const router: ExpressRouter = Router();

router.post("/register", (_req, _res, next) => next(new NotImplementedError()));
router.post("/login", (_req, _res, next) => next(new NotImplementedError()));
router.post("/magic-link/generate", (_req, _res, next) => next(new NotImplementedError()));
router.get("/magic-link/verify", (_req, _res, next) => next(new NotImplementedError()));

export default router;
