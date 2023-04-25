import type { IUser } from '~/domain/entities/user';
import { User } from '~/domain/entities/user';
import { UserModel } from '~/domain/entities/user';

export class UserRepository {
  public static async addUser(user: IUser): Promise<IUser> {
    const res = await UserModel.create(user);
    const object = res.toObject();
    return new User(object.username, object.name, object.password, object.email, object.profilePicture, object.phoneNumber, object.usertype);
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public static async findUserByUserId(username: String): Promise<IUser> {
    const user: IUser = await UserModel.findOne({ username: username });
    if (!user) return null;
    return user;
  } 


  public static async editarUsuari(oldUser: IUser, newUser: IUser): Promise<void> {
    await UserModel.replaceOne(oldUser, newUser);
  }

  

}
 