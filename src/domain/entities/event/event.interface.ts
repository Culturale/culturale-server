import type { IChat } from '~/domain/entities/chat/chat.interface';
import type { MongoId } from '~/types/types';
export interface IEvent {
  id: MongoId;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari: string;
  adress: string;
  url: string;
  latitud: number;
  longitud: number;
  categoria: string;
  telefon: number;
  aforament: number;
  Nasis: number;
  chat: IChat;
}
