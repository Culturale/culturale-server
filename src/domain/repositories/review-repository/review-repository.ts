import { ObjectId } from 'mongodb';
import { IReview } from '~/domain/entities/review';
import { ReviewModel } from '~/domain/entities/review';

export class ReviewRepository {

  public static async addReview( eventCode: string, author: string, puntuation: number, comment?: string): Promise<IReview> {
    const review = await ReviewModel.create({
      puntuation: puntuation,
      author: author,
      eventCode: eventCode,
      comment: comment || null,
    });
    console.log(review)
    return review;
  }
  public static async findValoracioById(id: ObjectId): Promise<IReview> {
    return ReviewModel.findById(id);
}
}

