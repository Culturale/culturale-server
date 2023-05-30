import mongoose from 'mongoose';

import type { Chat, IChat } from '~/domain/entities/chat';
import type { IEvent } from '~/domain/entities/event';
import { EventModel, Event } from '~/domain/entities/event';
import type { CreateEventDto } from '~/infrastructure';
import type { MongoId } from '~/types/types';

type CategoriaEnum =
  | 'agenda:categories/activitats-virtuals'
  | 'agenda:categories/exposicions'
  | 'agenda:categories/concerts'
  | 'agenda:categories/teatre'
  | 'agenda:categories/festivals-i-mostres'
  | 'agenda:categories/rutes-i-visites'
  | 'agenda:categories/infantil'
  | 'agenda:categories/festes'
  | 'agenda:categories/conferencies'
  | 'agenda:categories/fires-i-mercats'
  | 'agenda:categories/dansa'
  | 'agenda:categories/cicles';

interface EventFilters {
  denominacio?: { $regex: string, $options: 'i' };
  categoria?:  { $eq: CategoriaEnum};
  dataIni?: { $gte: Date };
  dataFi?: { $lte: Date };
  horari?: string;
  price?: { $lte: string};
}

export class EventRepository {
  public static async addEvent(
    event: CreateEventDto,
    chatId: MongoId,
  ): Promise<IEvent> {
    const newEvent = await EventModel.create({
      ...event,
      chat: chatId,
      participants: [],
      valoracions: [],
    });
    return newEvent;
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    const eventDocument = await EventModel.find()
      .populate({
        path: 'participants',
        model: 'User',
      })
      .populate({
        path: 'valoracions',
        model: 'Review',
      });

      const events: IEvent[] = [];

      for (const doc of eventDocument) {
        const event = new Event(doc);
        events.push(event);
      }
      
      return events;
  }

  public static async getEventsPag(skip: number, limit: number): Promise<IEvent[]> {
    const eventDocuments = await EventModel.find()
      .populate({
        path: 'participants',
        model: 'User',
      })
      .populate({
        path: 'valoracions',
        model: 'Review',
      })
      .skip(skip)
      .limit(limit);
  
    const events: IEvent[] = [];
  
    for (const doc of eventDocuments) {
      const event = new Event(doc);
      events.push(event);
    }
    
    return events;
  }

  
  public static async getEventsWithinMapArea(lat1: number, lon1: number, lat2: number, lon2: number): Promise<IEvent[]> {
    const eventDocuments = await EventModel.find({
      lat: { $gte: lat1, $lte: lat2 },
      long: { $gte: lon1, $lte: lon2 }
    })
      .populate({
        path: 'participants',
        model: 'User',
      })
      .populate({
        path: 'valoracions',
        model: 'Review',
      });
  
    const events: IEvent[] = [];
  
    for (const doc of eventDocuments) {
      const event = new Event(doc);
      events.push(event);
    }
 
    return events;
  }
  
  

  public static async find(filter: EventFilters): Promise<IEvent[]> {
    const eventDocument = await EventModel.find(filter)
      .populate({ 
        path: 'participants',
        model: 'User',
      })
      .populate({
        path: 'valoracions',
        model: 'Review',
      });

      const events: IEvent[] = [];

      for (const doc of eventDocument) {
        const event = new Event(doc);
        events.push(event);
      }
      
      return events;
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
      .populate({
        path: 'valoracions',
        model: 'Review',
      });

    if (eventDocument) {
      const event: IEvent = new Event(eventDocument);
      return event;
    }
    return null;
  }

  public static async editarEvent(newEvent: IEvent): Promise<void> {
    const participants = newEvent.participants.map(
      (participant) => participant.id,
    );
    const valoracions = newEvent.valoracions.map((valoracio) => valoracio._id);

    await EventModel.findByIdAndUpdate(newEvent.id, {
      ...newEvent,
      participants,
      valoracions,
    });
  }

  public static async getChatEvent(idEvent: string): Promise<IChat | null> {
    const event = await EventModel.findById(
      new mongoose.Types.ObjectId(idEvent),
    );
    if (!event) return null;
    return event.chat;
  }

  public static async modifyChatEvent(
    event: IEvent,
    chat: Chat,
  ): Promise<void> {
    await EventModel.findOneAndUpdate(event, { chat: chat }, { new: true });
  }

  public static async getEventbydenominacio(name: String): Promise<IEvent[]> {
    const eventDocument = await EventModel.find({ denominacio: name })
    .populate({
      path: 'participants',
      model: 'User',
    })
    .populate({
      path: 'valoracions',
      model: 'Review',
    });

    const events: IEvent[] = [];

    for (const doc of eventDocument) {
      const event = new Event(doc);
      events.push(event);
    }
    
    return events;
  }

  public static async getEventbydataIni(data: Date): Promise<IEvent[]> {
    return await EventModel.find({ dataIni: data });
  }

  public static async getEventbydataFi(data: Date): Promise<IEvent[]> {
    return await EventModel.find({ dataFi: data });
  }

  public static async getEventbycategoria(cat: String): Promise<IEvent[]> {
    return await EventModel.find({ categoria: cat });
  }
}
