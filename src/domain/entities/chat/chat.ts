import type { IMessage } from '~/domain/entities/message/message.interface';
import type { MongoId } from '~/types/types';

import type { IChat } from './chat.interface';

export class Chat implements IChat {
  public _id: MongoId;
  public messages?: IMessage[];

  constructor(_id: MongoId, messages: IMessage[]) {
    this._id = _id;
    this.messages = messages;
  }

  public get id(): string {
    return this._id.toString();
  }
}
