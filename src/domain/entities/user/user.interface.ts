import type { MongoId } from '~/types/types';

export interface IUser {
  id: MongoId;
  email: string;
  username: string;
  password: string;
}
