import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';

import { IUser, User, UserProps } from '~/domain/entities/user';
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

   
  public static async editUser(req: Request, res: Response): Promise<void> {
    try{
      const oldUser: IUser = await UserRepository.findUserByUserId(req.body.username);
      if(!oldUser){
        res.status(404).json({message: 'El usuario indicado no existe'});
        return;
      }
      else{
      const newUser : IUser = {
        ...oldUser,
        username: oldUser.username,
        name: req.body.name || oldUser.name,
        password: req.body.password || oldUser.password,
        email: req.body.email || oldUser.email,
        profilePicture: req.body.profilePicture || oldUser.profilePicture,
        phoneNumber: req.body.phoneNumber || oldUser.phoneNumber,
        usertype : oldUser.usertype,
        followers : oldUser.followers,
      };

      await UserRepository.editarUsuari(newUser);
      const { id, ...userProps } = newUser; // Excluye el campo 'id' del objeto 'newUser'
      const castedUser = new User(userProps as UserProps);
      res.status(200).json({message: 'Usuario editado correctamente', user: castedUser});

      //const castedUser = new User(newUser as UserProps);
       //res.status(200).json({message: 'Ususario editado correctamente', user : castedUser});  
      }}
      catch (e) {
        res.status(500);
        res.json({
          error: e,
        });
      }
   }

   public static async addFollower(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const username = req.body.username;
      const follower = req.body.follower;
      const newFollower: IUser = await UserRepository.findUserByUserId(follower);
      const newUser: IUser = await UserRepository.findUserByUserId(username);
      
      if(!newUser || !newFollower){
        res.status(404);
        res.json({
          message: 'user followed or new follow not found'
        });
      }
      const castedUser = new User(newUser as UserProps);
      castedUser.updateFollowers(newFollower);

      await UserRepository.editarUsuari(castedUser);
      
      res.status(200);
      res.json({
        message: 'Follower añadido correctamente',
        followers: newUser.followers,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
 



   