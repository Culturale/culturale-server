import { Schema, model } from 'mongoose';

import type { IReview } from './review.interface';

const ReviewSchema = new Schema({
  author: { required: true, type: String },
  eventCode: { required: true, type: String }, 
  puntuation: { required: true, type: Number},
  comment: { required: false, type:  String}
});

const ReviewModel = model<IReview>('Review', ReviewSchema);

export { ReviewModel };
