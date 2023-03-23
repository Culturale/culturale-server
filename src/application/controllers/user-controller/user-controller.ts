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

   
  public static async editUser(_req: Request, res: Response): Promise<void> {
    try{
        const newParameter: string = _req.body.newParam;
        const oldParameter: string = _req.body.oldParam;
        const tipusAtribut: string = _req.body.tipusAtribut;
         if(newParameter != oldParameter){
            await UserRepository.updateUser(newParameter, oldParameter, tipusAtribut);
            res.status(200).json({message: tipusAtribut + " editado, su nuevo " + tipusAtribut + " es: " + newParameter});
           }
          else{ // Si el nuevo paramtero es igual al anterior da error
            res.status(406).json({ message: "El" + tipusAtribut + " no ha sido editado porque el nuevo" +tipusAtribut+" es igual al anterior."});
          }
      }
    catch (e) {
        res.status(500);
        res.json({
          error: e,
        });
      }
   }
}
 



   