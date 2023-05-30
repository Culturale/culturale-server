import type { MongoId } from '~/types/types';

import type { IReview } from './review.interface';

export type reviewProps = {
  _id?: MongoId;
  puntuation: number;
  comment?: string;
  authorId: string;
  eventId: string;
  report: number;
};
export class Review implements IReview {
  public _id: MongoId;
  public puntuation: number;
  public comment?: string;
  public authorId: string;
  public eventId: string;
  public report: number;

  constructor(props: reviewProps) {
    const { _id, puntuation, comment, authorId, eventId , report} = props;
    this._id = _id;
    this.puntuation = puntuation;
    this.comment = comment || null;
    this.authorId = authorId;
    this.eventId = eventId;
    this.report = report;
  }

  public get id(): string {
    return this._id.toString();
  }
}
