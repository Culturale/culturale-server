import type { ObjectId } from 'mongodb';

import type { IReview } from '~/domain/entities/review';
import { ReviewModel } from '~/domain/entities/review';

export class ReviewRepository {

  public static async addReview( eventId: string, author: string, puntuation: number, comment?: string): Promise<IReview> {
    const review = await ReviewModel.create({
      puntuation: puntuation,
      author: author,
      eventId: eventId,
      comment: comment || null,
    });

    return review;
  }
  public static async findValoracioById(id: ObjectId): Promise<IReview> {
    return ReviewModel.findById(id);
}
}

