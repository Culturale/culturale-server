import { normalize } from 'path';
import type { Chat, IChat } from '~/domain/entities/chat';
import type { IEvent } from '~/domain/entities/event';
import { Event } from '~/domain/entities/event';
import { EventModel } from '~/domain/entities/event';

export class EventRepository {
  public static async addEvent(event: IEvent, chat: IChat): Promise<IEvent> {
    const document = await EventModel.create({
      chat: chat.id,
      ...event,
    });
    const object = document.toObject();
    return new Event(
      object._id,
      object.codi,
      object.denominacio,
      object.descripcio,
      object.dataIni,
      object.dataFi,
      object.horari,
      object.adress,
      object.url,
      object.chat
    );
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }
  public static async deleteEvent(codi: string): Promise<void> {
    await EventModel.deleteOne({id: codi });
  }

  public static async findEvent(codiEvent: string): Promise<IEvent> {
    return await EventModel.findOne({codi: codiEvent})
    .populate({path: 'valoracions', model: 'Review'});
     
  }

  public static async editarEvent(newEvent: IEvent): Promise<IEvent> {
    const chat = newEvent.chat;
    const valoracions = newEvent.valoracions;
    await EventModel.findByIdAndUpdate(newEvent.id,{
      ...newEvent,
      chat,
      valoracions,
    });
    return newEvent;
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
