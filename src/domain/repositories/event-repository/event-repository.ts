
import type { Chat, IChat } from '~/domain/entities/chat';
import type { IEvent } from '~/domain/entities/event';
import { EventModel } from '~/domain/entities/event';
import type { CreateEventDto } from '~/infrastructure';
import type { MongoId } from '~/types/types';

export class EventRepository {
  public static async addEvent(event: CreateEventDto, chatId: MongoId): Promise<IEvent> {
    const newEvent = await EventModel.create({
      ...event,
      chat: chatId,
      participants: [],
    });

    return newEvent;
  }


  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }
  public static async deleteEvent(codi: string): Promise<void> {
    await EventModel.deleteOne({codi: codi });
  }

  public static async findEvent(codiEvent: string): Promise<IEvent> {
    const eventDocument = await EventModel.findOne({codi: codiEvent})
    .populate({
      path: 'participants',
      model: 'User',
    });
    return eventDocument;
  }

  public static async editarEvent(newEvent: IEvent): Promise<void> {
    const participants = newEvent.participants;
    await EventModel.findByIdAndUpdate(newEvent.id, {
      ...newEvent,
      participants,
    });
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

  public static async getEventbydenominacio(name: String): Promise<IEvent[]> {
    return await EventModel.find({denominacio: name});
  }

  public static async getEventbydataIni(data: Date): Promise<IEvent[]> {
    return await EventModel.find({dataIni: data});
  }

  public static async getEventbydataFi(data: Date): Promise<IEvent[]> {
    return await EventModel.find({dataFi: data});
  }

  public static async getEventbycategoria(cat: String): Promise<IEvent[]> {
    return await EventModel.find({categoria: cat});
  }
}
