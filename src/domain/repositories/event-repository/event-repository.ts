import type { Chat, IChat } from '~/domain/entities/chat';
import type { IEvent } from '~/domain/entities/event';
import { EventModel } from '~/domain/entities/event';

export class EventRepository {
  public static async addEvent(event: IEvent): Promise<IEvent> {
    await EventModel.create({
      ...event,
      chat: event.chat?.id,
    });
    return event;
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }

  public static async findEvent(codiEvent: string): Promise<IEvent> {
    const event: IEvent = await EventModel.findOne({codi: codiEvent});
    return event;
  }

  public static async editarEvent(oldEvent: IEvent, newEvent: IEvent): Promise<void> {
    await EventModel.replaceOne(oldEvent, newEvent);
  }


  public static async getChatEvent(codi: number): Promise<IChat | null> {
    const event = await EventModel.findOne({ codi: codi });
    if (!event) return null;
    return event.chat;
  }

  public static async modifyChatEvent(
    event: IEvent,
    chat: Chat
  ): Promise<void> {
    await EventModel.findOneAndUpdate(event, { chat: chat }, { new: true });
  }
}
