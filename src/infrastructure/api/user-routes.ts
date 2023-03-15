import type { Request, Response } from "express";
import express from "express";

import { UserController } from "~/application";
import { createUserDto } from "~/infrastructure/dtos";

export const userRouter = express.Router();

userRouter.get("/test-user", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.json({
    hello: "you",
  });
});

userRouter.post("/users/create", createUserDto, UserController.createUser);

userRouter.get("/users", UserController.getAllUsers);
