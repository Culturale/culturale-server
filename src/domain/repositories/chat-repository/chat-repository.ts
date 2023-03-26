import type { IChat } from "~/domain/entities/chat";
import { ChatModel } from "~/domain/entities/chat";

export class ChatRepository {
  public static async createEmptyChat(chat: IChat): Promise<void> {
    await ChatModel.create(chat);
  }

  public static async findChat(codiEvent: String): Promise<IChat> {
    const query = { codiEsdeveniment: codiEvent };
    return await ChatModel.findOne(query);
  }
}
