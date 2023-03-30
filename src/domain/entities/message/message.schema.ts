import { Schema, model } from 'mongoose';

import type { IMessage } from './message.interface';

const MessageSchema = new Schema({
  content: { required: false, type: String },
  date: { required: true, type: Date },
  userId: { required: true, type: String },
});

const MessageModel = model<IMessage>('Message', MessageSchema);

export { MessageModel };
