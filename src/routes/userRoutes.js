import { Router } from "express";
import {
  findAll,
  findById,
  save,
  update,
  deleteById,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", findAll);
userRouter.get("/:id", findById);
userRouter.post("/", save);
userRouter.put("/:id", update);
userRouter.delete("/:id", deleteById);

export default userRouter;
