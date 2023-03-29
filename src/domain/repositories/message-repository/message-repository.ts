import type { IMessage } from "~/domain/entities/message";
import { MessageModel } from "~/domain/entities/message";

export class MessageRepository {
  public static async create(
    content: string,
    date: Date,
    userId: string
  ): Promise<IMessage> {
    const newMessage = new MessageModel({
      content: content,
      date: date,
      userId: userId,
    });
    return newMessage;
  }

  public static async getMessage(message: IMessage): Promise<IMessage[]> {
    return await MessageModel.find(message);
  }
}
