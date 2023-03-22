import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UserModel } from "~/domain/entities/user";

export async function logIn(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");

  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (isPasswordCorrect) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    }
    res.status(400).json({
      message: `Username ${req.body.username} not found`,
    });
  } catch (e) {
    res.status(500);
    res.json({
      error: e,
    });
  }
}
