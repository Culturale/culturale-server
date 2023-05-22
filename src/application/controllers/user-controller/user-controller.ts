import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';

import type { IUser, UserProps } from '~/domain/entities/user';
import { IEvent } from '~/domain/entities';
import { User } from '~/domain/entities/user';
import { UserRepository } from '~/domain/repositories/user-repository/user-repository';
import { EventRepository } from '~/domain/repositories';
import type { ChangePasswordDto, AddFavouriteDto } from '~/infrastructure';

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

  public static async getUserForUsername(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const username: String = req.params.id;
      const user: IUser = await UserRepository.findByUsername(username);
      if (user) {
        res.status(200);
        res.json({
          message: 'Usuario encontrado',
          user: user,
        });
      } else {
        res.status(404);
        res.json({
          message: 'Usuario no encontrado',
        });
      }
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async editUser(req: Request, res: Response): Promise<void> {
    try {
      const username: String = req.body.username;
      const oldUser: IUser = await UserRepository.findByUsername(username);
      if (!oldUser) {
        res.status(404).json({ message: 'El usuario indicado no existe' });
        return;
      } else {
        const newUser: IUser = {
          ...oldUser,
          username: oldUser.username,
          name: req.body.name || oldUser.name,
          password: req.body.password || oldUser.password,
          email: req.body.email || oldUser.email,
          profilePicture: req.body.profilePicture || oldUser.profilePicture,
          phoneNumber: req.body.phoneNumber || oldUser.phoneNumber,
          usertype: oldUser.usertype,
          followers: oldUser.followers,
          followeds: oldUser.followeds,
          eventSub: oldUser.eventSub,
        };

        await UserRepository.editarUsuari(newUser);
        const { ...userProps } = newUser; // Excluye el campo 'id' del objeto 'newUser'
        const castedUser = new User(userProps as UserProps);
        res
          .status(200)
          .json({ message: 'Usuario editado correctamente', user: castedUser });
      }
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async changePassword(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const items: ChangePasswordDto = req.body;
      const current_password: string = items.current_password;
      const new_password: string = items.new_password;
      const user_id: string = req.params.id;
      const user = await UserRepository.findById(user_id);

      if (!user) {
        // Caso usuario no existe:
        res
          .status(404)
          .json({ message: "El usuario con ID: '" + user_id + "' no existe" });
      } else if (!(await bcrypt.compare(current_password, user.password))) {
        // Caso la contrasena actual pasada por parametro no coincide con la contrasena del usuario:
        res.status(400).json({
          message: 'Contraseña actual no coincide con la del usuario',
        });
      } else if (current_password == new_password) {
        // Caso la contrasena actual y la nueva son la misma:
        res
          .status(400)
          .json({ message: 'La nueva contraseña es igual a la actual' });
      } else {
        // Caso existe usuario, la contrasena actual coincide con la del usuario y la contrasena nueva es diferente a la actual:
        user.password = (await bcrypt.hash(new_password, 10)) as string;
        await UserRepository.editarUsuari(user);

        res
          .status(200)
          .json({ message: 'Contraseña modificada correctamente' });
      }
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async addFollower(req: Request, res: Response): Promise<void> {
    try {
      const username = req.body.username;
      const follower = req.body.follower;
      const newFollower: IUser = await UserRepository.findByUsername(follower);
      const newUser: IUser = await UserRepository.findByUsername(username);

      if (!newUser || !newFollower) {
        res.status(404);
        res.json({
          message: 'user followed or new follow not found',
        });
      }
      const castedUser = new User(newUser as UserProps);
      castedUser.updateFollowers(newFollower); //los que te siguen a ti -> se añade newFollower como seguidor en el perfil de newUser
      const castedUser2 = new User(newFollower as UserProps);
      castedUser2.updateFolloweds(newUser); //los que tu sigues -> se añade newUser como nueva persona seguida en el perfil de newFollower

      await UserRepository.editarUsuari(castedUser);
      await UserRepository.editarUsuari(castedUser2);

      res.status(200);
      res.json({
        message: 'Follower i followed añadido correctamente',
        followers: newUser.followers,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async Unfollow(req: Request, res: Response): Promise<void> {
    try {
      const username = req.body.username;
      const follower = req.body.follower;
      const newFollower: IUser = await UserRepository.findByUsername(follower);
      const newUser: IUser = await UserRepository.findByUsername(username);

      if (!newUser || !newFollower) {
        res.status(404);
        res.json({
          message: 'user unfollowed or new unfollow not found',
        });
      }
      const castedUser = new User(newUser as UserProps);
      castedUser.deleteFollowers(newFollower); //los que te siguen a ti -> se añade newFollower como seguidor en el perfil de newUser
      const castedUser2 = new User(newFollower as UserProps);
      castedUser2.deleteFolloweds(newUser); //los que tu sigues -> se añade newUser como nueva persona seguida en el perfil de newFollower

      await UserRepository.editarUsuari(castedUser);
      await UserRepository.editarUsuari(castedUser2);

      res.status(200);
      res.json({
        message: 'Follower y followed eliminados correctamente',
        followers: newUser.followers,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }


  public static async addFavourite(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const addFavouriteDto: AddFavouriteDto = req.body;
      const { id, username } = addFavouriteDto;

      const event: IEvent = await EventRepository.findEvent(id);
      const user: IUser = await UserRepository.findByUsername(username);

      if (!event || !user) {
        res.status(404);
        res.json({
          message: 'user or event not found',
        });
        return;
      }


      user.updateEventPref(event);

      await UserRepository.editarUsuari(user);

      res.status(200);
      res.json({
        message: 'Evento añadido a favoritos correctamente',
      });
    } catch (error) {
      res.status(500);
      res.json({
        error,
      });
    }
  }
}
