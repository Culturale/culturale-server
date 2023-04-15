import type { IMessage } from '~/domain/entities/message';
import { Message } from '~/domain/entities/message';
import { MessageModel } from '~/domain/entities/message';

export class MessageRepository {
  public static async addMessage(content: string, userId: string, date: Date): Promise<IMessage> {
    console.log(content, userId, date);
    const document = await MessageModel.create({
      content: content,
      userId: userId,
      date: date,
    });
    console.log(document);
    const object = document.toObject();
    console.log(object);
    return new Message(
      object._id,
      object.content,
      object.userId,
      object.date,
    );
  }
  public static async getMessage(message: string): Promise<IMessage> {
    return await MessageModel.findById(message);
  }
}

