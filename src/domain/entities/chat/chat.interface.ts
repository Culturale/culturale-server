import type { IMessage } from "~/domain/entities/message/message.interface";
export interface IChat {
  id: string;
  messages: IMessage[];
}
