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
    if(event.categoria == 'agenda:categories/activitats-virtuals') event.photo='https://monaeduca.org/wp-content/uploads/activitats-virtuals.1.png';
    else if(event.categoria == 'agenda:categories/exposicions') event.photo='https://media.timeout.com/images/105827609/image.jpg';
    else if(event.categoria == 'agenda:categories/concerts') event.photo='https://static-resources.mirai.com/wp-content/uploads/sites/1745/20230124101723/conciertos-Barcelona-2023.jpg';
    else if(event.categoria == 'agenda:categories/teatre') event.photo='https://www.lugaris.com/app/uploads/2020/06/tivoli.jpg';
    else if(event.categoria == 'agenda:categories/festivals-i-mostres') event.photo='https://www.speakeasybcn.com/perch/resources/blog/barcelona-spring-festival-tefl-iberia-w960h720.jpg';
    else if(event.categoria == 'agenda:categories/rutes-i-visites') event.photo='https://turisme.llucanes.cat/wp-content/uploads/2020/05/Prats-Espai-Memoria-4-700x466.jpg';
    else if(event.categoria == 'agenda:categories/infantil') event.photo='https://www.plusarts.es/pics_fotosproductos/28/big_fit_juegos-gigantes-plus-arts-1_1.jpg';
    else if(event.categoria == 'agenda:categories/festes') event.photo='https://festesmajorsdecatalunya.cat/wp-content/uploads/2018/07/380__02000023000006900012-2-700x445.jpg';
    else if(event.categoria == 'agenda:categories/conferencies') event.photo='https://i0.wp.com/tribunadarqueologia.blog.gencat.cat/wp-content/uploads/2023/03/IMG_20230329_181440.jpg?resize=809%2C607&ssl=1';
    else if(event.categoria == 'agenda:categories/fires-i-mercats') event.photo='https://www.vilanova.cat/img/img_73681602.jpg';
    else if(event.categoria == 'agenda:categories/dansa') event.photo='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.europapress.es%2Fcatalunya%2Fnoticia-festival-dansa-metropolitana-programa-mas-300-actividades-12-municipios-barcelona-20220225123526.html&psig=AOvVaw3wBL7F7lPTf5ygJOiq47BJ&ust=1686064656262000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPjbgrq2rP8CFQAAAAAdAAAAABAE';
    else if(event.categoria == 'agenda:categories/cicles') event.photo='https://ciclescatalunya.cat/wp-content/uploads/2018/10/slider1_cicles_catalunya.jpg';
    
    
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

  public static async getEventById(eventId: string): Promise<IEvent | null> {
    const event: IEvent | null = await EventModel.findById(eventId)
      .populate({
        path: 'participants',
        model: 'User',
      })
      .populate({
        path: 'valoracions',
        model: 'Review',
      })
      .exec();
  
    return event;
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
