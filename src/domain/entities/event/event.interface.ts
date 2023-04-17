import type { IChat } from '~/domain/entities/chat/chat.interface';
import type { MongoId } from '~/types/types';

import type { IUser } from '../user';

export interface IEvent {
  id: MongoId;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari?: string;
  adress?: string;
  url: string;
  chat: IChat;
  participants: IUser[];

  updateParticipant: (newParticipant: IUser) => void;
}
