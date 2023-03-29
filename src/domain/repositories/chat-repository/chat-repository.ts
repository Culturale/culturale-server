import type { IChat } from '~/domain/entities/chat';
import { Chat } from '~/domain/entities/chat';
import { ChatModel } from '~/domain/entities/chat';

export class ChatRepository {
  public static async createEmptyChat(): Promise<IChat> {
    const chatDocument = await ChatModel.create({ messages: [] });
    const chatObject = chatDocument.toObject();
    return new Chat(chatObject._id, chatObject.messages);
  }
}
