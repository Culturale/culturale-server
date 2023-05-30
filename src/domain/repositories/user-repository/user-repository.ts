import type { FilterQuery } from 'mongoose';

import { ReviewModel } from '~/domain/entities';
import { EventModel } from '~/domain/entities/event';
import type { IUser } from '~/domain/entities/user';
import { UserModel } from '~/domain/entities/user';
import { User } from '~/domain/entities/user';
import type { CreateUserDto } from '~/infrastructure';

export class UserRepository {
  public static async addUser(user: CreateUserDto): Promise<IUser> {
    const newUser = await UserModel.create({
      ...user,
      followers: [],
      followeds: [],
      eventSub: [],
    });
    return newUser;
  }

  public static async getAllUsers(filter: FilterQuery<IUser> = {}): Promise<IUser[]> {
    const userDocs = await UserModel.find(filter)
      .populate({
        path: 'eventSub',
        model: EventModel,
      })
      .populate({
        path: 'followers',
        model: 'User',
      })
      .populate({
        path: 'followeds',
        model: 'User',
      });
    const users: IUser[] = [];

    for (const doc of userDocs) {
      const user = new User(doc);
      users.push(user);
    }

    return users;
  }

  public static async getReportedUsers(): Promise<IUser[]> {
    const userDocs = await UserModel.find( { report: { $gt: 0 } }  )
      .populate({
        path: 'eventSub',
        model: EventModel,
      })
      .populate({
        path: 'followers',
        model: 'User',
      })
      .populate({
        path: 'followeds',
        model: 'User',
      });
    const users: IUser[] = [];
  
    for (const doc of userDocs) {
      const user = new User(doc);
      users.push(user);
    }
  
    return users;
  }  

  public static async findById(userId: string): Promise<IUser> {
    const userDoc = await UserModel.findById(userId)
      .populate({
        path: 'followeds',
        model: 'User',
      })
      .populate({
        path: 'eventSub',
        model: 'Event',
      })
      .populate({
        path: 'reviews',
        model: 'Review',
      })
      .populate({
        path: 'followers',
        model: 'User',
      });

    if (userDoc) {
      const user: IUser = new User(userDoc);
      return user;
    }
    return null;
  }

  public static async findByUsername(username: String): Promise<IUser> {
    const userDoc = await UserModel.findOne({ username: username })
      .populate({
        path: 'followeds',
        model: 'User',
      })
      .populate({
        path: 'eventSub',
        model: 'Event',
      })
      .populate({
        path: 'reviews',
        model: ReviewModel,
      })
      .populate({
        path: 'followers',
        model: 'User',
      });

    if (userDoc) {
      const user: IUser = new User(userDoc);
      return user;
    }
    return null;
  }

  public static async editarUsuari(newUser: IUser): Promise<void> {
    const followers = newUser.followers.map((follower) => follower.id);
    const followeds = newUser.followeds.map((followed) => followed.id);
    const eventSub = newUser.eventSub.map((event) => event.id);
    const reviews = newUser.reviews.map((review) => review._id);

    await UserModel.findByIdAndUpdate(newUser.id, {
      ...newUser,
      followers,
      followeds,
      eventSub,
      reviews,
    });
  }

  public static async deleteUser(idUser: string): Promise<void> {
    
    await EventModel.updateMany(
      { participants: idUser },
      { $pull: { participants: idUser } }
    );
  
    await UserModel.updateMany(
      { followers: idUser },
      { $pull: { followers: idUser } }
    );
  
    await UserModel.updateMany(
      { followeds: idUser },
      { $pull: { followeds: idUser } }
    );
  
    await ReviewModel.deleteMany({ authorId: idUser });

    await UserModel.deleteOne({ _id: idUser });
  
  }
  

  public static async existParam(
    param: string,
    tipusAtribut: string,
  ): Promise<boolean> {
    let existe: boolean;
    switch (tipusAtribut) {
      case 'username':
        existe = !((await UserModel.exists({ username: param })) == null);
        break;
      case 'email':
        existe = !((await UserModel.exists({ username: param })) == null);
    }
    return existe;
  }
}
