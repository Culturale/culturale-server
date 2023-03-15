import { IUser, UserModel } from '~/domain/entities/user';

export class UserRepository {
  public static async addUser(user: IUser) {
    await UserModel.create(user);
  }
}
