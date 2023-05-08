import type { MongoId } from '~/types/types';

export interface IReview {
  _id: MongoId;
  author: string;
  eventId: string; 
  puntuation: number;
  comment?: string;     
}
