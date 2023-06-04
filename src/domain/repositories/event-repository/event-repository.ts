import AWS from 'aws-sdk';
import axios from 'axios';
import mongoose from 'mongoose';

import type { Chat, IChat } from '~/domain/entities/chat';
import type { IEvent } from '~/domain/entities/event';
import { EventModel, Event } from '~/domain/entities/event';
import type { CreateEventDto } from '~/infrastructure';
import { S3Service } from '~/infrastructure/services/s3';
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

  public static s3Service: S3Service;


  constructor() {
    EventRepository.s3Service = new S3Service();
  }

  // Configuración de AWS
  static s3 = new AWS.S3({
    accessKeyId: 'AKIA6NVZVAKMPLRO26QO',
    secretAccessKey: '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',
  });

    // Función para descargar y subir la imagen a S3
    static uploadImageToS3 = async (imageUrl: string, bucketName: string, key: string) => {
      try {
        // Descargar la imagen utilizando Axios
        const response = await axios.get(imageUrl, {
          responseType: 'arraybuffer',
        });

        // Convertir la respuesta a un Buffer
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Parámetros para subir la imagen a S3
        const uploadParams = {
          Bucket: bucketName,
          Key: key,
          Body: imageBuffer,
        };

        // Subir la imagen a S3
        const uploadResult = await this.s3.upload(uploadParams).promise();

        console.log('Imagen subida exitosamente a S3:', uploadResult.Location);
      } catch (error) {
        console.error('Error al subir la imagen a S3:', error);
      }
    };



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
    
    const imageUrl = newEvent.photo; // Obtén la URL de la imagen desde el evento o la base de datos
    const bucketName = `https://projecteaws.s3.eu-west-3.amazonaws.com/${newEvent.id}`;
    const key = `${newEvent.id}.jpg`;
    
  
    await EventRepository.uploadImageToS3(imageUrl, bucketName, key);
  

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
