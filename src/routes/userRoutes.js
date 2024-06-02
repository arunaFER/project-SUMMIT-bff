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
userRouter.post("/", save);
userRouter.put("/", update);

userRouter.get("/:id", findById);
userRouter.delete("/:id", deleteById);

userRouter.get("/username/:username", findByUsername);

export default userRouter;
