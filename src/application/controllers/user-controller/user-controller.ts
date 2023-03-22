import type { Request, Response } from "express";
//import { MongoNetworkTimeoutError } from "mongodb";
import { IUser } from "~/domain/entities/user";
import { UserRepository } from "~/domain/repositories/user-repository/user-repository";
//import { isNull } from "util";

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      await UserRepository.addUser(user);
      res.status(200);
      res.json({
        message: "user created",
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

   
  public static async editParam(_req: Request, res: Response): Promise<void> {
    try{
        const newParameter: string = _req.body.newParam;
        const oldParameter: string = _req.body.oldParam;
        const tipusAtribut: string = _req.body.tipusAtribut;

        if(newParameter != oldParameter){
          if(! await UserRepository.existParam(oldParameter, tipusAtribut)){ // Si el parametro antiguo no existe da error
            res.status(406).json({message: "No existe el "+tipusAtribut+ "  " + oldParameter});
           }
          else if( await UserRepository.existParam(newParameter, tipusAtribut)){ // Si el parametro nuevo ya existe da error
            res.status(406).json({message: "El "+ tipusAtribut  + " " + newParameter +" ya existe."});
           }
          else{   // Si el parametro antiguo existe, lo reemplaza por el nuevo (caso de éxito)
            await UserRepository.editParam(newParameter, oldParameter,tipusAtribut);
            res.status(200).json({message: tipusAtribut + " editado, su nuevo " + tipusAtribut + " es: " + newParameter});
            }
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
 



   