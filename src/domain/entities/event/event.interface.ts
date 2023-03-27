import type { IChat } from "~/domain/entities/chat/chat.interface";
export interface IEvent {
  id: string;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari?: string;
  adress?: string;
  url: string;
  chat: IChat;
}
