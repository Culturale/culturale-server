import { Schema, model } from 'mongoose';

import type { IReview } from './review.interface';

const ReviewSchema = new Schema({
  authorId: { required: true, type: String },
  eventId: { required: true, type: String }, 
  puntuation: { required: true, type: Number},
  comment: { required: false, type:  String},
  report: { required: true, type: Number, default: 0 }
});

const ReviewModel = model<IReview>('Review', ReviewSchema);

export { ReviewModel };
