import type { IUser } from "~/domain/entities/user";
import { UserModel } from "~/domain/entities/user";

export class UserRepository {
  public static async addUser(user: IUser): Promise<void> {
    await UserModel.create(user);
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public static async updateUser(nouParam: string, oldParam: string, tipusAtribut: string ): Promise<void> {
    switch (tipusAtribut) {
      case "username":
         await UserModel.findOneAndUpdate({ username: oldParam }, { username: nouParam }, { returnOriginal: false });
         break;
      case "email":
         await UserModel.findOneAndUpdate({ email: oldParam }, { email: nouParam, },{ returnOriginal: false });
         break;
      case "password":
        await UserModel.findOneAndUpdate({ password: oldParam }, { password: nouParam, },{ returnOriginal: false });
        break;
      case "telefon":
        await UserModel.findOneAndUpdate({ telefon: oldParam }, { telefon: nouParam, },{ returnOriginal: false });
        break;
      case "image":
        await UserModel.findOneAndUpdate({ image: oldParam }, { image: nouParam, },{ returnOriginal: false });
        break;

    }
    }

}
 