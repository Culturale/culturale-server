import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';

import type { IEvent } from '~/domain/entities';
import type { IUser, UserProps } from '~/domain/entities/user';
import { User } from '~/domain/entities/user';
import { EventRepository } from '~/domain/repositories';
import { UserRepository } from '~/domain/repositories/user-repository/user-repository';
import type {
  ChangePasswordDto,
  AddFavouriteDto,
  CreateUserDto,
} from '~/infrastructure';
import { StripeService } from '~/infrastructure/services';

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto: CreateUserDto = req.body;
      createUserDto.password = await bcrypt.hash(req.body.password, 10);
      const stripe = new StripeService();
      const { email, name, phoneNumber } = createUserDto;

      const stripeCustomerId = await stripe.createCustomer(
        email,
        name,
        phoneNumber,
      );

      const userCreated = await UserRepository.addUser({
        ...createUserDto,
        stripeCustomerId,
      });

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

  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { username, name, phoneNumber } = req.query;

      // Construir el filtro basado en los parámetros de búsqueda
      const filtro: Partial<IUser> = {};

      if (username) {
        filtro.username = username.toString();
      }

      if (name) {
        filtro.name = name.toString();
      }

      if (phoneNumber) {
        filtro.phoneNumber = phoneNumber.toString();
      }

      const users: IUser[] = await UserRepository.getAllUsers(filtro);

      res.status(200).json({
        users,
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  }

  public static async getReportedUsers(
    _req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const users: IUser[] = await UserRepository.getReportedUsers();
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

  //el test de este es el editar user
  public static async ReportUser(req: Request, res: Response): Promise<void> {
    try {
      const username = req.body.username; //user_id del user que queremos bloquear
      const userReported: IUser = await UserRepository.findByUsername(username);
      const castedUser = new User(userReported as UserProps);

      castedUser.report = castedUser.report + 1;

      await UserRepository.editarUsuari(castedUser);

      res.status(200);
      res.json({
        message: 'User reported',
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


  public static async  getUserForId(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const user: IUser = await UserRepository.findById(id);
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
          report: req.body.report || oldUser.report,
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

  public static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.body.id;
      await UserRepository.deleteUser(id);
      res.status(200);
    } catch (e) {
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
      castedUser.updateFolloweds(newFollower); //los que te siguen a ti -> se añade newFollower como seguidor en el perfil de newUser
      const castedUser2 = new User(newFollower as UserProps);
      castedUser2.updateFollowers(newUser); //los que tu sigues -> se añade newUser como nueva persona seguida en el perfil de newFollower

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

  public static async addFavourite(req: Request, res: Response): Promise<void> {
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

  public static async deleteFavourite(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const codiEvent = req.body.id;
      const username = req.body.username;
      const event: IEvent = await EventRepository.findEvent(codiEvent);
      const user: IUser = await UserRepository.findByUsername(username);
      if (!event || !user) {
        res.status(404);
        res.json({
          message: 'user or event not found',
        });
        return;
      }

      const castedUser = new User(user as UserProps);
      castedUser.deleteFavourite(event);

      await UserRepository.editarUsuari(castedUser);

      res.status(200);
      res.json({
        message: 'Evente eliminado de favoritos correctamente',
        preferits: user.preferits,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
