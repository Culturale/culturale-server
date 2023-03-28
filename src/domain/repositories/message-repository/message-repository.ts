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
    //const messageObject = await newMessage.save();
    //console.log("hola");

    // const message = await MessageModel.create({ content, date, userId });
    // console.log(message);
    // const messageObject = message.toObject();
    //return messageObject;
  }

  public static async findMessage(): Promise<IMessage[]> {
    return await MessageModel.find();
  }
}
