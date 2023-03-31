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

  public static async findUser(usernameUsuari: string): Promise<IUser> {
    const usuari: IUser = await UserModel.findOne({username: usernameUsuari});
    return usuari;
  }

  public static async editarUsuari(oldUser: IUser, newUser: IUser): Promise<void> {
    await UserModel.replaceOne(oldUser, newUser);
  }

  

}
 