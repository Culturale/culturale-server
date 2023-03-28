import type { IMessage } from "~/domain/entities/message/message.interface";

import type { IChat } from "./chat.interface";

export class Chat implements IChat {
  public id: string;
  public messages: IMessage[];

  constructor(id: string, messages: IMessage[]) {
    this.id = id;
    this.messages = messages;
  }
}
