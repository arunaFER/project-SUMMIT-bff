import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/signOut", signOut);

export default authRouter;
