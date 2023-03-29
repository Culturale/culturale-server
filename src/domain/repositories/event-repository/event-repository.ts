import type { IChat } from "~/domain/entities/chat";
import type { IEvent } from "~/domain/entities/event";
import { EventModel } from "~/domain/entities/event";

export class EventRepository {
  public static async addEvent(event: IEvent, chat: IChat): Promise<void> {
    await EventModel.create(event, chat);
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }

  public static async removeEvent(codiEvent: string): Promise<void> {
    await EventModel.deleteOne({codi: codiEvent});
  }

  public static async getChat(codiEvent: string): Promise<string> {
    const event: IEvent = await EventModel.findOne({codi: codiEvent});
    return event.chat.id;
  }

}
