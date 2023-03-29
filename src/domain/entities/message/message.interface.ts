import type { MongoId } from '~/types/types';

export interface IMessage {
  _id: MongoId;
  content: string;
  userId: string;
  date: Date;
}
