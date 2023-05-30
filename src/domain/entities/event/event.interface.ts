import type { MongoId } from '~/types/types';

import type { IChat } from '../chat';
import type { IReview } from '../review';
import type { IUser } from '../user';

type CategoriaEnum =
  | 'agenda:categories/activitats-virtuals'
  | 'agenda:categories/exposicions'
  | 'agenda:categories/concerts'
  | 'agenda:categories/teatre'
  | 'agenda:categories/festivals-i-mostres'
  | 'agenda:categories/rutes-i-visites'
  | 'agenda:categories/infantil'
  | 'agenda:categories/festes'
  | 'agenda:categories/conferencies'
  | 'agenda:categories/fires-i-mercats'
  | 'agenda:categories/dansa'
  | 'agenda:categories/cicles';

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
  categoria: CategoriaEnum;

  updateValoracions: (newValoracio: IReview) => void;
  addParticipant: (newParticipant: IUser) => void;
  deleteParticipant: (participant: IUser) => void;

  readonly id: string;
}
