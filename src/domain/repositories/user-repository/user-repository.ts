import { IUser, User, UserProps } from '~/domain/entities/user';
//import { User } from '~/domain/entities/user';
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

  public static async findUserByUserId(username: String): Promise<IUser> {
    const userDoc = await UserModel.findOne({ username: username });
    const user = new User(userDoc as UserProps);
    if (!userDoc) return null;
    return user;
  } 


  public static async editarUsuari(newUser: IUser): Promise<void> {
    const followers = newUser.followers;
    await UserModel.findByIdAndUpdate(newUser.id, {
      ...newUser,
      followers,
    });
  }

  

}
 