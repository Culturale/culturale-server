import type { IChat } from '~/domain/entities/chat/chat.interface';
import type { MongoId } from '~/types/types';

import type { User } from '../user';
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
  chat: IChat;
  assistents: Array<User>;
}
