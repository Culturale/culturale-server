
import mongoose from 'mongoose';

import type { Chat, IChat } from '~/domain/entities/chat';
import type { EventProps, IEvent} from '~/domain/entities/event';
import { Event } from '~/domain/entities/event';
import { EventModel } from '~/domain/entities/event';
import type { CreateEventDto } from '~/infrastructure';
import type { MongoId } from '~/types/types';

export class EventRepository {
  public static async addEvent(event: CreateEventDto, chatId: MongoId): Promise<IEvent> {
    const newEvent = await EventModel.create({
      ...event,
      chat: chatId,
      participants: [],
      valoracions: [],
    });
    return newEvent;
  }

  

  public static async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }
  public static async deleteEvent(idEvent: string): Promise<void> {
    await EventModel.deleteOne(new mongoose.Types.ObjectId(idEvent));
  }

  public static async findEvent(idEvent: string): Promise<IEvent> {
    const eventDocument = await EventModel.findById(idEvent)
    .populate({
      path: 'participants',
      model: 'User',
    })
    ;

    if(eventDocument){
    const eventBuscat:IEvent = new Event(eventDocument as EventProps);
    return eventBuscat;
    }
    else return null;
  }

  public static async editarEvent(newEvent: IEvent): Promise<void> {
    const participants = newEvent.participants;
    const valoracions = newEvent.valoracions;
    await EventModel.findByIdAndUpdate(newEvent.id, {
      ...newEvent,
     participants,
      valoracions,
    });
  }


  public static async getChatEvent(idEvent: string): Promise<IChat | null> {
    const event = await EventModel.findById(new mongoose.Types.ObjectId(idEvent));
    if (!event) return null;
    return event.chat;
  }

  public static async modifyChatEvent(
    event: IEvent,
    chat: Chat
  ): Promise<void> {
    await EventModel.findOneAndUpdate(event, { chat: chat }, { new: true });
  }

  public static async getEventbydenominacio(searchtext: String[]): Promise<IEvent[]> {
    return EventModel.find({
      $or: [
        { denominacio: { $regex: searchtext.join('|'), $options: 'i' } },
        { descripcio: { $regex: searchtext.join('|'), $options: 'i' } },
      ],
    })
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
