//import { ObjectId } from "mongodb";
import type { IChat } from "~/domain/entities/chat";
import type { Chat } from "~/domain/entities/chat";
import { ChatModel } from "~/domain/entities/chat";
import type { IMessage } from "~/domain/entities/message/message.interface";

export class ChatRepository {
  public static async createEmptyChat(): Promise<IChat> {
    const chat = new ChatModel({ messages: [] as IMessage[] });
    await chat.save();
    return chat;
  }
  public static async addMessage(
    chatId: IChat,
    message: IMessage
  ): Promise<Chat> {
    const chat = await ChatModel.findById(chatId);
    chat.messages.push(message);
    const modifiedChat = await chat.save();
    return modifiedChat;
  }
}
