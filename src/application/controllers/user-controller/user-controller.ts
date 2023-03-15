import { IUser } from '~/domain/entities/user';
import { UserRepository } from '~/domain/repositories/user-repository/user-repository';

export class UserController {
  public static async createUser(user: IUser) {
    await UserRepository.addUser(user);
  }
}
