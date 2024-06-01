import { Router } from "express";
import AuthRouter from "./authRoutes.js";
import UserRouter from "./userRoutes.js";

const router = Router();

// Auth route
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);

export default router;
