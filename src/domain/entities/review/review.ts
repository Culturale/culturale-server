import type { MongoId } from '~/types/types';

import type { IReview } from './review.interface';

export type reviewProps = {
  id?: MongoId;
  puntuation: number;
  comment?: string;
  author: string;
  eventCode: string;
};
export class Review implements IReview  {
  public _id: MongoId;
  public puntuation: number;
  public comment?: string;
  public author: string;
  public eventCode: string;

  constructor(props: reviewProps) {
    const {id, puntuation, comment, author, eventCode} = props;
    this._id = id;
    this.puntuation = puntuation;
    this.comment = comment || null;
    this.author = author;
    this.eventCode = eventCode;
  }
  
}
