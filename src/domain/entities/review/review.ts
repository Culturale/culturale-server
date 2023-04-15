import type { MongoId } from '~/types/types';

import type { IReview } from './review.interface';


export class Review implements IReview  {
  public _id: MongoId;
  public puntuation: number;
  public comment?: string[];
  public author: string;
  public eventCode: string;

  constructor(id: MongoId, puntuation: number, comment: string[], author: string, eventCode: string) {
    this._id = id;
    this.puntuation = puntuation;
    this.comment = comment || [];
    this.author = author;
    this.eventCode = eventCode;
  }
  
}
