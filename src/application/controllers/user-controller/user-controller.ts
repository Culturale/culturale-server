import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';

import type { IUser } from '~/domain/entities/user';
import { UserRepository } from '~/domain/repositories/user-repository/user-repository';

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      user.password = await bcrypt.hash(req.body.password, 10);
      const userCreated = await UserRepository.addUser(user);
      res.status(200);
      res.json({
        message: 'user created',
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
        message: 'User deleted',
        username: user.username,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: 'Cannot find user with that id'
      });
    }
  }

   
  public static async editUser(req: Request, res: Response): Promise<void> {
    try{
      const oldUser: IUser = await UserRepository.findUserByUserId(req.body.username);
      if(oldUser == null){
        res.status(400).json({message: 'El usuario indicado no existe'});
      }
      else{
        
      const newUser = {
        username: oldUser.username,
        name: req.body.name || oldUser.name,
        password: req.body.password || oldUser.password,
        email: req.body.email || oldUser.email,
        profilePicture: req.body.profilePicture || oldUser.profilePicture,
        phoneNumber: req.body.phoneNumber || oldUser.phoneNumber,
        usertype : oldUser.usertype
      };

      await UserRepository.editarUsuari(oldUser, newUser);
       res.status(200).json({message: 'Ususario editado correctamente', user : newUser});  
      }}
    catch (e) {
        res.status(500);
        res.json({
          error: e,
        });
      }
   }
}
 



   