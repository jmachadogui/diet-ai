import { Router, type Router as ExpressRouter } from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { NotImplementedError } from "../middleware/errorHandler";

const router: ExpressRouter = Router();

router.use(authenticateJWT);
router.get("/me", (_req, _res, next) => next(new NotImplementedError()));
router.patch("/me", (_req, _res, next) => next(new NotImplementedError()));

export default router;
