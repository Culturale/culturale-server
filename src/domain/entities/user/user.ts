import type { MongoId } from '~/types/types';

import type { IUser } from './user.interface';

export class User implements IUser {
  public id: MongoId;
  public email: string;
  public username: string;
  public password: string;

  constructor(id: MongoId, email: string, username: string, password: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
