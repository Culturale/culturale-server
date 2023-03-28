import type { Chat, IChat } from "~/domain/entities/chat";
import type { IEvent } from "~/domain/entities/event";
import { EventModel } from "~/domain/entities/event";

export class EventRepository {
  public static async addEvent(event: IEvent, chat: Chat): Promise<void> {
    const newEvent = new EventModel({
      adress: event.adress,
      chat: chat,
      codi: event.codi,
      dataFi: event.dataFi,
      dataIni: event.dataIni,
      denominacio: event.denominacio,
      descripcio: event.descripcio,
      horari: event.horari,
      id: event.id,
      url: event.url,
    });
    await newEvent.save();
    //await EventModel.create(event, chat);
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }

  public static async getChatEvent(codi: number): Promise<IChat | null> {
    const event = await EventModel.findOne({ codi: codi });
    if (!event) return null;
    return event.chat as IChat;
  }

  public static async modifyChatEvent(
    event: IEvent,
    chat: Chat
  ): Promise<void> {
    await EventModel.findOneAndUpdate(event, { chat: chat }, { new: true });
  }
}
