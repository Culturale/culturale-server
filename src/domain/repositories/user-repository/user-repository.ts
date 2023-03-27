import type { IUser } from "~/domain/entities/user";
import { UserModel } from "~/domain/entities/user";

export class UserRepository {
  public static async addUser(user: IUser): Promise<void> {
    await UserModel.create(user);
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public static async findUser(usernameUsuari: string): Promise<IUser> {
    let usuari: IUser = await UserModel.findOne({username: usernameUsuari});
    console.log(usuari);
    return usuari;
  }

  public static async editarUsuari(oldUser: IUser, newUser: IUser): Promise<void> {
    await UserModel.replaceOne(oldUser, newUser);
  }

  

}
 