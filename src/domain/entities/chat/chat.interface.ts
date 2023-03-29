import type { IMessage } from '~/domain/entities/message/message.interface';
import type { MongoId } from '~/types/types';
export interface IChat {
  id: MongoId;
  messages?: IMessage[];
}
