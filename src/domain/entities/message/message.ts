import type { MongoId } from '~/types/types';

import type { IMessage } from './message.interface';

export class Message implements IMessage {
  public _id: MongoId;
  public content: string;
  public userId: string;
  public date: Date;

  constructor(id: MongoId, content: string, userId: string, date: Date) {
    this._id = id;
    this.content = content;
    this.userId = userId;
    this.date = date;
  }
}
