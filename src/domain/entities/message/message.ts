import type { IMessage } from './message.interface';

export class Message implements IMessage {
  public id: string;
  public content: string;
  public userId: string;
  public date: Date;

  constructor(id: string, content: string, userId: string, date: Date) {
    this.id = id;
    this.content = content;
    this.userId = userId;
    this.date = date;
  }
}
