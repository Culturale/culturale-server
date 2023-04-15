import { Schema, model } from 'mongoose';

import type { IReview } from './review.interface';

const ReviewSchema = new Schema({
  author: { required: true, type: String },
  eventCode: { required: true, type: String }, 
  puntuation: { required: true, type: Number},
  comment: { required: false, type:  [String]}
});

const MessageModel = model<IReview>('Review', ReviewSchema);

export { MessageModel };
