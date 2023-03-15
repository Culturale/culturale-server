import type { IUser} from "~/domain/entities/user";
import { UserModel } from "~/domain/entities/user";

export class UserRepository {
  public static async addUser(user: IUser): Promise<void> {
    await UserModel.create(user);
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }
}
