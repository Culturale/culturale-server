import mongoose from 'mongoose';

import type { IUser } from '~/domain/entities/user';
import { UserModel } from '~/domain/entities/user';
import type { CreateUserDto } from '~/infrastructure';

export class UserRepository {
  public static async addUser(user: CreateUserDto): Promise<IUser> {
    const newUser = await UserModel.create({
      ...user,
      followers : [],
    });
    return newUser;
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public static async findUserByUsername(username: String): Promise<IUser> {
    const userDoc = await UserModel.findOne({ username: username })
    .populate({
      path: 'followers',
      model: 'User',
    })
    .populate({
      path: 'followeds',
      model: 'User',
    });
    
    return userDoc;
  } 
  
  public static async findUserById(userId: string): Promise<IUser> {
    const userDoc = await UserModel.findById(new mongoose.Types.ObjectId(userId))   
    .populate({
      path: 'followers',
      model: 'User',
    })
    .populate({
      path: 'followeds',
      model: 'User',
    })
    .populate({
      path: 'reviews',
      model: 'Review',
      });
    if (!userDoc) return null;
    return userDoc;
  }

  
  public static async editarUsuari(newUser: IUser): Promise<void> {
    const followers = newUser.followers;
    const followeds = newUser.followeds;
    
    await UserModel.findByIdAndUpdate(newUser.id, {
      ...newUser,
      followers,
      followeds,
    });
  }
  public static async existParam(param: string, tipusAtribut: string): Promise<boolean> {
    let existe: boolean;
    switch (tipusAtribut) {
      case 'username':
        existe = !(await UserModel.exists({ username: param }) == null);
        break;
      case 'email':
        existe = !(await UserModel.exists({ username: param }) == null);
    }
    return existe;
  
  }
}
 