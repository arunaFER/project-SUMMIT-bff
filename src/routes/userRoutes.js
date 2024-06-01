import { Router } from "express";
import {
  findAll,
  findById,
  save,
  update,
  deleteById,
  findByUsername,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", findAll);
userRouter.get("/:id", findById);
userRouter.get("/username/:username", findByUsername);
userRouter.post("/", save);
userRouter.put("/", update);
userRouter.delete("/:id", deleteById);

export default userRouter;
