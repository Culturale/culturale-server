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
import type { CreateEventDto } from '~/infrastructure';

export class EventController {
  public static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventDTO: CreateEventDto = req.body;
      const chat: Chat = await ChatRepository.createEmptyChat();
      await EventRepository.addEvent(eventDTO,chat.id);
      res.status(200);
      res.json({
        message: 'event created',
        event: eventDTO,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }

  public static async getAllEvents( _req: Request, res: Response): Promise<void> {
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
      const oldEvent = await EventRepository.findEvent(req.body.codi);
      if (!oldEvent) {
        res.status(404).json({message: 'Evento no encontrado'});
        return;
      }
      const newEvent: IEvent = {
        ... oldEvent,
        denominacio: req.body.denominacio || oldEvent.denominacio,
        descripcio: req.body.descripcio || oldEvent.descripcio,
        dataIni: req.body.dataIni || oldEvent.dataIni,
        dataFi: req.body.dataFi || oldEvent.dataFi,
        horari: req.body.horari || oldEvent.horari,
        adress: req.body.adress || oldEvent.adress,
        url: req.body.url || oldEvent.adress,
        chat: oldEvent.chat,
        participants: oldEvent.participants,
      };
      await EventRepository.editarEvent(newEvent);
       res.status(500).json({message: 'Evento editado correctamente'});  
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
      const codiEvent = req.body.codi;
      const chatEvent: IChat = await EventRepository.getChatEvent(codiEvent);
      if(!chatEvent){
        res.status(404);
        res.json({message:'event not found'});
        return;
      }
      const newMessage: IMessage = await MessageRepository.addMessage(req.body.content, req.body.userId, req.body.date);
      const chat: Chat = await ChatRepository.addMessage(chatEvent, newMessage);
      await EventRepository.modifyChatEvent(codiEvent, chat);
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
      const codiEvent = req.body.codi;
      const chatEvent: IChat = await EventRepository.getChatEvent(codiEvent);
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
      const codiEvent = req.body.codi;
      const username = req.body.username;
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

public static async deleteEvent(_req: Request, res: Response): Promise<void> {

  try {
    const codi: string = _req.body.id;
    await EventRepository.deleteEvent(codi);
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
}