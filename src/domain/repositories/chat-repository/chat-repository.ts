//import { ObjectId } from "mongodb";
import type { IChat } from "~/domain/entities/chat";
import type { Chat } from "~/domain/entities/chat";
import { ChatModel } from "~/domain/entities/chat";
import type { IMessage } from "~/domain/entities/message/message.interface";
import { MessageModel } from "~/domain/entities/message/message.schema";

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
  public static async getMessages(chatId: IChat): Promise<IMessage[]> {
    const chat = await ChatModel.findById(chatId.toString()).populate(
      "messages"
    );
    const messages = chat.messages;
    console.log(typeof chat.messages[0]);
    const messageValues = [];
    console.log(messages);
    for (let i = 0; i < messages.length; i++) {
      const messageId = messages[i];
      console.log("First elem - ", messageId, typeof messageId);
      const message = await MessageModel.findById(messageId);
      console.log("message -", message);
      const messageObject = {
        content: message.content,
        date: message.date,
        id: message.id,
        userId: message.userId,
      };
      console.log(messageObject);
      messageValues.push(messageObject);
    }
    return messageValues;
  }
}
