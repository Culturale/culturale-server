import type { IUser } from './user.interface';

export class User implements IUser {
  public id: string;
  public email: string;
  public username: string;
  public password: string;

  constructor(id: string, email: string, username: string, password: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
