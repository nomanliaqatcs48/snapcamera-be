import express from "express";
import {
  userLogin,
  createUser,
  userUpdate,
  getUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/create", createUser);
userRouter.get("/:id", getUser);
userRouter.put("/update", userUpdate);

export default userRouter;
