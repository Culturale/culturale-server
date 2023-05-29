import type { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

import type { IReview } from '~/domain/entities/review';
import { ReviewModel } from '~/domain/entities/review';

export class ReviewRepository {

  public static async addReview( eventId: string, authorId: string, puntuation: number, comment?: string): Promise<IReview> {
    const review = await ReviewModel.create({
      puntuation: puntuation,
      authorId: authorId,
      eventId: eventId,
      comment: comment || null,
      report: 0,
    });

    return review;
  }

  public static async findValoracioById(id: ObjectId): Promise<IReview> {
    return ReviewModel.findById(id);
  }

  public static async editarReview(newReview: IReview): Promise<void> {
    await ReviewModel.findByIdAndUpdate(newReview._id, {
      ...newReview,
    });
  }

  public static async deleteReview(idReview: string): Promise<void> {
    await ReviewModel.deleteOne(new mongoose.Types.ObjectId(idReview));
  }

  public static async getReportedValoracio(): Promise<IReview[]> {
    const reviewDocs = await ReviewModel.find({ report: { $gt: 0 } });
    return reviewDocs.map(doc => {
      const review = doc.toObject() as IReview;
      return review;
    });
  }
  
}

