import { IUser } from '~/domain/entities/user';
import { UserRepository } from '~/domain/repositories/user-repository/user-repository';

export class UserController {
  public static async createUser(user: IUser): Promise<void> {
    await UserRepository.addUser(user);
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return await UserRepository.getAllUsers();
  }
}
