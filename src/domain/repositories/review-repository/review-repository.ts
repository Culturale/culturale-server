import type { ObjectId } from 'mongodb';

import type { IReview } from '~/domain/entities/review';
import { ReviewModel } from '~/domain/entities/review';

export class ReviewRepository {

  public static async addReview( eventId: string, authorId: string, puntuation: number, comment?: string): Promise<IReview> {
    const review = await ReviewModel.create({
      puntuation: puntuation,
      authorId: authorId,
      eventId: eventId,
      comment: comment || null,
      report: false,
    });

    return review;
  }
  public static async findValoracioById(id: ObjectId): Promise<IReview> {
    return ReviewModel.findById(id);
}
}

