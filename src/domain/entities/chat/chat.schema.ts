import { Schema, model } from 'mongoose';

import type { IChat } from './chat.interface';

const ChatSchema = new Schema({
  messages: [{ required: true, type: Schema.Types.ObjectId }], //COLLECTION OF MESSAGE
});

const ChatModel = model<IChat>('Chat', ChatSchema);

export { ChatModel };
