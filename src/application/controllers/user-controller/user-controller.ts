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

   
  public static async editUser(req: Request, res: Response): Promise<void> {
    try{
      const oldUser = await UserRepository.findUser(req.body.username);
      const newUser: IUser = {
        id: oldUser.id,
        email: req.body.email || oldUser.email,
        username: oldUser.username,
        password: req.body.password || oldUser.password,
       // telefon: req.body.telefon || oldUser.telefon,
       // image: req.body.image || oldUser.image,
      };
      await UserRepository.editarUsuari(oldUser, newUser);
       res.status(200).json({message: "Ususario editado correctamente"});  
      }
    catch (e) {
        res.status(500);
        res.json({
          error: e,
        });
      }
   }
}
 



   