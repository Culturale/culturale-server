import type { IMessage } from "~/domain/entities/message/message.interface";

import type { IChat } from "./chat.interface";

export class Chat implements IChat {
  public id: string;
  public codiEsdeveniment: number;
  public messages: IMessage[];

  constructor(id: string, codiEsdeveniment: number, messages: IMessage[]) {
    this.id = id;
    this.codiEsdeveniment = codiEsdeveniment;
    this.messages = messages;
  }
}
