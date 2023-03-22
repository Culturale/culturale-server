import type { IUser } from "~/domain/entities/user";
import { UserModel } from "~/domain/entities/user";

export class UserRepository {
  public static async addUser(user: IUser): Promise<void> {
    await UserModel.create(user);
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public static async editParam(nouParam: string, oldParam: string, tipusAtribut: string ): Promise<void> {
    switch (tipusAtribut) {
      case "username":
         await UserModel.findOneAndUpdate({ username: oldParam }, { username: nouParam });
         break;
      case "email":
         await UserModel.findOneAndUpdate({ email: oldParam }, { email: nouParam });

    }
    }

  
  public static async existParam(param: string, tipusAtribut: string): Promise<boolean> {
    let existe: boolean;
    switch (tipusAtribut) {
      case "username":
        existe = !(await UserModel.exists({ username: param }) == null);
        break;
      case "email":
        existe = !(await UserModel.exists({ username: param }) == null);
    }
    return existe;
  
  }
}
 