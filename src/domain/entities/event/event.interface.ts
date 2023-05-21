import type { MongoId } from '~/types/types';

import type { IChat } from '../chat';
import type { IReview } from '../review';
import type { IUser } from '../user';

export interface IEvent {
  _id: MongoId;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari?: string;
  adress: string;
  lat?: number;
  long?: number;
  price?: string;
  url?: string;
  photo?: string;
  chat: IChat;
  valoracions?: IReview[];
  participants?: IUser[];

  updateValoracions: (newValoracio: IReview) => void;
  addParticipant: (newParticipant: IUser) => void;
  deleteParticipant: (participant: IUser) => void;

  readonly id: string;
}
