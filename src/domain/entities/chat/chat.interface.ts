import type { IMessage } from '~/domain/entities/message/message.interface';
import type { MongoId } from '~/types/types';
export interface IChat {
  _id: MongoId;
  messages?: IMessage[];

  readonly id: string;
}
