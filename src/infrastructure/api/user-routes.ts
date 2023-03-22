import type { Request, Response } from "express";
import express from "express";

import { UserController } from "~/application";
import { createUserDto, editParamDTO, loginDto} from "~/infrastructure/dtos";
import { logIn } from "~/application/use-cases";
import { authMiddleware } from "~/infrastructure/middlewares";

export const userRouter = express.Router();

userRouter.get("/test-user", authMiddleware, (req: Request, res: Response) => {
  res.status(200);
  res.json({
    hello: "you",
  });
});

userRouter.post("/users/create", createUserDto, UserController.createUser);

userRouter.get("/users", UserController.getAllUsers);

userRouter.post("/users/edit", editParamDTO, UserController.editUser );
userRouter.post("/users/login", loginDto, logIn);
