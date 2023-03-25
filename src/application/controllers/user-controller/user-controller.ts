import bcrypt from "bcrypt";
import type { Request, Response } from "express";

import type { IUser } from "~/domain/entities/user";
import { UserRepository } from "~/domain/repositories/user-repository/user-repository";

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      user.password = await bcrypt.hash(req.body.password, 10);
      const userCreated = await UserRepository.addUser(user);
      res.status(200);
      res.json({
        message: "user created",
        user: userCreated,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users: IUser[] = await UserRepository.getAllUsers();
      res.status(200);
      res.json({
        users,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id: String = req.params.id;
      const user: IUser = await UserRepository.deleteUser(id);

      res.status(200);
      res.json({
        message: "User deleted",
        username: user.username,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e
      });
    }
  }
}
