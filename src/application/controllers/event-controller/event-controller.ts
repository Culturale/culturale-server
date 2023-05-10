import type { Request, Response } from 'express';

import type { Chat, IChat } from '~/domain/entities/chat';
import type { EventProps, IEvent} from '~/domain/entities/event';
import { Event} from '~/domain/entities/event';
import type { IMessage } from '~/domain/entities/message';
import type { IUser } from '~/domain/entities/user';
import { UserRepository } from '~/domain/repositories';
import { ChatRepository } from '~/domain/repositories/chat-repository/chat-repository';
import { EventRepository } from '~/domain/repositories/event-repository/event-repository';
import { MessageRepository } from '~/domain/repositories/message-repository/message-repository';
import type { CreateEventDto, AddParticipantDto } from '~/infrastructure';

export class EventController {
  public static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventDTO: CreateEventDto = req.body;
      const chat: Chat = await ChatRepository.createEmptyChat();
      const event = await EventRepository.addEvent(eventDTO,chat.id);
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

  public static async getAllEvents(req: Request, res: Response): Promise<void> {
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

  public static async editEvent(req: Request, res: Response): Promise<void> {
    try{
      const oldEvent = await EventRepository.findEvent(req.body.id);
      if (!oldEvent) {
        res.status(404);
        res.json({message: 'Evento no encontrado'});
        return;
      }
      const newEvent: IEvent = {
        ... oldEvent,
        id: oldEvent.id,
        codi: oldEvent.codi,
        denominacio: req.body.denominacio || oldEvent.denominacio,
        descripcio: req.body.descripcio || oldEvent.descripcio,
        dataIni: req.body.dataIni || oldEvent.dataIni,
        dataFi: req.body.dataFi || oldEvent.dataFi,
        horari: req.body.horari || oldEvent.horari,
        adress: req.body.adress || oldEvent.adress,
        lat: req.body.lat || oldEvent.lat,
        long: req.body.long || oldEvent.long,
        price: req.body.price || oldEvent.price,
        url: req.body.url || oldEvent.url,
        photo: req.body.photo || oldEvent.photo,
        chat: oldEvent.chat,
      };
      const { ...eventProps } = newEvent; // Excluye el campo 'id' del objeto 'newUser'
      const castedEvent = new Event(eventProps as EventProps);
      await EventRepository.editarEvent(castedEvent);
      res.status(200);
      res.json({message: 'Evento editado correctamente'});  
    }
    catch (e) {
        res.status(500);
        res.json({
          error: e,
        });
      }
   }

  public static async addMessageEvent(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const idEvent = req.body.id;
      const chatEvent: IChat = await EventRepository.getChatEvent(idEvent);
      if(!chatEvent){
        res.status(404);
        res.json({message:'event not found'});
        return;
      }
      const newMessage: IMessage = await MessageRepository.addMessage(req.body.content, req.body.userId, req.body.date);
      const chat: Chat = await ChatRepository.addMessage(chatEvent, newMessage);
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
    res: Response
  ): Promise<void> {
    try {
      const idEvent = req.params.id;
      const chatEvent: IChat = await EventRepository.getChatEvent(idEvent);
      if(chatEvent === null){
        res.status(404);
        res.json({
          message: 'Event not found'
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
    res: Response
  ): Promise<void> {
    try {
      const participantDTO: AddParticipantDto = req.body;
      const codiEvent = participantDTO.id;
      const username = participantDTO.username;
      const newEvent: IEvent = await EventRepository.findEvent(codiEvent);
      const newParticipant: IUser = await UserRepository.findUserByUserId(username);
      if(!newEvent || !newParticipant){
        res.status(404);
        res.json({
          message: 'user or event not found'
        });
        return;
      }
      
      const castedEvent = new Event(newEvent as EventProps);
      castedEvent.updateParticipant(newParticipant);

      await EventRepository.editarEvent(castedEvent);
      
      res.status(200);
      res.json({
        message: 'Participante añadido correctamente',
        participants: newEvent.participants,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async deleteParticipant(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const codiEvent = req.body.id;
      const username = req.body.username;
      const event: IEvent = await EventRepository.findEvent(codiEvent);
      const participant: IUser = await UserRepository.findUserByUserId(username);
      if(!event || !participant){
        res.status(404);
        res.json({
          message: 'user or event not found'
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
  
  public static async getEventbydenominacio(req: Request, res: Response): Promise<void> {
    try {
      const event: IEvent[] = await EventRepository.getEventbydenominacio(req.params.denominacio);
      if (event.length == 0) {
        res.status(404);
        res.json({
          error: 'No event with that denomination found',
        });
      }
      res.status(200);
      res.json({
        event,
      });
    }
    catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getEventbydataIni(req: Request, res: Response): Promise<void> {
    try {
      const event: IEvent[] = await EventRepository.getEventbydataIni(new Date(req.params.dataIni));
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
    }
    catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getEventbydataFi(req: Request, res: Response): Promise<void> {
    try {
      const event: IEvent[] = await EventRepository.getEventbydataFi(new Date(req.params.dataFi));
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
    }
    catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getEventbycategoria(req: Request, res: Response): Promise<void> {
    try {
      const event: IEvent[] = await EventRepository.getEventbycategoria(req.params.categoria);
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
    }
    catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
