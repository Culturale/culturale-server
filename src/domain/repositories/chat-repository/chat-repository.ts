import type { IChat } from "~/domain/entities/chat";
import { Chat } from "~/domain/entities/chat";
import { ChatModel } from "~/domain/entities/chat";

export class ChatRepository {
  public static async createEmptyChat(): Promise<IChat> {
    const chatDocuments = await ChatModel.create();
    const chatObject = chatDocuments[0].toObject();
    return new Chat(chatObject.id, chatObject.messages);
  }
  public static async removeChat(codiChat: string): Promise<void> {
    await ChatModel.deleteOne({ id: codiChat });
  }
}
