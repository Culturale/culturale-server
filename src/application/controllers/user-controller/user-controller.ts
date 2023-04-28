import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';

import { IUser, User, UserProps, } from '~/domain/entities/user';
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
      console.log(oldUser)
      if(oldUser === null){
        res.status(400).json({message: 'El usuario indicado no existe'});
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
        followers : oldUser.followers
      };
      
      console.log("new", newUser)
      await UserRepository.editarUsuari(newUser);
      console.log("A")
      console.log("new2", newUser)
       res.status(200).json({message: 'Ususario editado correctamente', user : newUser});  
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
      const newUserFollowed: IUser = await UserRepository.findUserByUserId(username);
      const newFollower = req.body.follower;
      if(!newFollower || !newUserFollowed){
        res.status(404);
        res.json({
          message: 'user followed or new follow not found'
        });
      }
      const castedUser = new User(newUserFollowed as UserProps);
      castedUser.updateFollowers(newFollower);

      await UserRepository.editarUsuari(castedUser);
      
      res.status(200);
      res.json({
        message: 'Follower añadido correctamente',
        participants: newFollower.followers,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
 



   