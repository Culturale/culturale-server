import type { IMessage } from "~/domain/entities/message";
import { MessageModel } from "~/domain/entities/message";

export class MessageRepository {
  public static async create(message: IMessage): Promise<void> {
    await MessageModel.create(message);
  }

  public static async findMessage(): Promise<IMessage[]> {
    return await MessageModel.find();
  }
}
