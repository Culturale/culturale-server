import type { IMessage } from '~/domain/entities/message/message.interface';
import type { MongoId } from '~/types/types';

import type { IChat } from './chat.interface';

export class Chat implements IChat {
  public id: MongoId;
  public messages?: IMessage[];

  constructor(id: MongoId, messages: IMessage[]) {
    this.id = id;
    this.messages = messages;
  }
}
