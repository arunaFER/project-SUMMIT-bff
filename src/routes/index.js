import { Router } from "express";
import AuthRouter from "./authRoutes.js";
import UserRouter from "./userRoutes.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = Router();

router.use("/auth", AuthRouter);

// Middleware for jwt auth
router.use(verifyJWT);

router.use("/user", UserRouter);

export default router;
