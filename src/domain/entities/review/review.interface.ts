import type { MongoId } from '~/types/types';

export interface IReview {
  _id: MongoId;
  authorId: string;
  eventId: string;
  puntuation: number;
  comment?: string;
  report: number; 
  readonly id: string;
}
