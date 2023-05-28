import type { Request, Response } from 'express';

import type {
  IUser,
  IMessage,
  IEvent,
  EventProps,
  IChat,
} from '~/domain/entities';
import { Event } from '~/domain/entities/event';
import {
  UserRepository,
  ChatRepository,
  EventRepository,
  MessageRepository,
} from '~/domain/repositories';
import type {
  CreateEventDto,
  AddParticipantDto,
  EditEventDTO,
} from '~/infrastructure';

interface EventFilters {
  denominacio?: { $regex: string, $options: 'i' };
  categoria?: { $eq: CategoriaEnum};
  dataIni?: { $gte: Date };
  dataFi?: { $lte: Date };
  horari?: string;
  price?: { $lte: string};
}

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

export class EventController {
  public static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventDTO: CreateEventDto = req.body;
      const chat: IChat = await ChatRepository.createEmptyChat();
      const event = await EventRepository.addEvent(eventDTO, chat._id);
      res.status(200);
      res.json({
        message: 'event created',
        event: event,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getAllEvents(
    _req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const events: IEvent[] = await EventRepository.getAllEvents();
      res.status(200);
      res.json({
        events,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
  


  public static async getEventsByFilters(req: Request, res: Response): Promise<void> {
    const filter: EventFilters = {};
  
    // Obtén los valores de los parámetros de consulta
    const {denominacio, categoria, dataIni, dataFi, horari, price } = req.query;
  
    // Asigna los valores de los parámetros de consulta al filtro
    if (denominacio) {
      filter.denominacio = { $regex: denominacio as string, $options: 'i' };
    }
    if (categoria) {
      filter.categoria = { $eq: categoria as CategoriaEnum};
    }
    if (dataIni) {
      filter.dataIni = { $gte: new Date(dataIni as string) };
    }
    if (dataFi) {
      filter.dataFi = { $lte: new Date(dataFi as string) };
    }
    if (horari) {
      filter.horari = horari as string;
    }
    if (price) {
      filter.price = { $lte: price as string };
    }
  
    try {
      // Filtra los eventos según los parámetros proporcionados
      const events: IEvent[] = await EventRepository.find(filter);
  
      // Envía los eventos filtrados como respuesta
      res.json({
        events,
      });
    }  catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async editEvent(req: Request, res: Response): Promise<void> {
    try {
      const editEventDto: EditEventDTO = req.body;
      const event = await EventRepository.findEvent(req.body.id);

      if (!event) {
        res.status(404);
        res.json({ message: 'Evento no encontrado' });
        return;
      }

      const newEventProps: EventProps = {
        ...event,
        codi: event.codi,
        denominacio: editEventDto.denominacio || event.denominacio,
        descripcio: editEventDto.descripcio || event.descripcio,
        dataIni: editEventDto.dataIni || event.dataIni,
        dataFi: editEventDto.dataFi || event.dataFi,
        horari: editEventDto.horari || event.horari,
        adress: editEventDto.adress || event.adress,
        lat: editEventDto.lat || event.lat,
        long: editEventDto.long || event.long,
        price: editEventDto.price || event.price,
        url: editEventDto.url || event.url,
        photo: editEventDto.photo || event.photo,
        chat: event.chat,
        categoria: editEventDto.categoria || event.categoria,
      };
      const newEvent = new Event(newEventProps);
      await EventRepository.editarEvent(newEvent);

      res.status(200);
      res.json({ message: 'Evento editado correctamente' });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async addMessageEvent(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const idEvent = req.body.id;
      const chatEvent: IChat = await EventRepository.getChatEvent(idEvent);
      if (!chatEvent) {
        res.status(404);
        res.json({ message: 'event not found' });
        return;
      }
      const newMessage: IMessage = await MessageRepository.addMessage(
        req.body.content,
        req.body.userId,
        req.body.date,
      );
      const chat: IChat = await ChatRepository.addMessage(
        chatEvent,
        newMessage,
      );
      await EventRepository.modifyChatEvent(idEvent, chat);
      res.status(200);
      res.json({
        message: 'chat sent it',
        messages: newMessage,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getAllMessages(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const idEvent = req.params.id;
      const chatEvent: IChat = await EventRepository.getChatEvent(idEvent);
      if (chatEvent === null) {
        res.status(404);
        res.json({
          message: 'Event not found',
        });
        return;
      }
      const messages: IMessage[] = await ChatRepository.getMessages(chatEvent);
      res.status(200);
      res.json({
        messages,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async addParticipant(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const addParticipantDto: AddParticipantDto = req.body;
      const { id, username } = addParticipantDto;

      const event: IEvent = await EventRepository.findEvent(id);
      const user: IUser = await UserRepository.findByUsername(username);

      if (!event || !user) {
        res.status(404);
        res.json({
          message: 'user or event not found',
        });
        return;
      }

      event.addParticipant(user);
      user.updateEventSub(event);

      await EventRepository.editarEvent(event);
      await UserRepository.editarUsuari(user);

      res.status(200);
      res.json({
        message: 'Participante añadido correctamente',
      });
    } catch (error) {
      res.status(500);
      res.json({
        error,
      });
    }
  }

  public static async deleteParticipant(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const codiEvent = req.body.id;
      const username = req.body.username;
      const event: IEvent = await EventRepository.findEvent(codiEvent);
      const participant: IUser = await UserRepository.findByUsername(username);
      if (!event || !participant) {
        res.status(404);
        res.json({
          message: 'user or event not found',
        });
        return;
      }

      const castedEvent = new Event(event as EventProps);
      castedEvent.deleteParticipant(participant);

      await EventRepository.editarEvent(castedEvent);

      res.status(200);
      res.json({
        message: 'Participante eliminado correctamente',
        participants: event.participants,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async deleteEvent(_req: Request, res: Response): Promise<void> {
    try {
      const id: string = _req.body.id;
      await EventRepository.deleteEvent(id);
      res.status(200);
      res.json({
        message: 'event deleted',
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getEventbydenominacio(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const events: IEvent[] = await EventRepository.getEventbydenominacio(
        req.params.denominacio,
      );
      if (events.length == 0) {
        res.status(404);
        res.json({
          error: 'No event with that denomination found',
        });
      }
      res.status(200);
      res.json({
        events,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getEventbydataIni(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const event: IEvent[] = await EventRepository.getEventbydataIni(
        new Date(req.params.dataIni),
      );
      if (event.length == 0) {
        res.status(404);
        res.json({
          error: 'No event with that dateIni found',
        });
      }
      res.status(200);
      res.json({
        event,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getEventbydataFi(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const event: IEvent[] = await EventRepository.getEventbydataFi(
        new Date(req.params.dataFi),
      );
      if (event.length == 0) {
        res.status(404);
        res.json({
          error: 'No event with that dataFi found',
        });
      }
      res.status(200);
      res.json({
        event,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getEventbycategoria(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const event: IEvent[] = await EventRepository.getEventbycategoria(
        req.params.categoria,
      );
      if (event.length == 0) {
        res.status(404);
        res.json({
          error: 'No event with that categoria found',
        });
      }
      res.status(200);
      res.json({
        event,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
