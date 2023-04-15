import type { Request, Response } from 'express';

import type { Chat, IChat } from '~/domain/entities/chat';
import type { IEvent} from '~/domain/entities/event';
import { Event } from '~/domain/entities/event';
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
      const event: IEvent = new Event({...eventDTO, chat, participants:[]});
      await EventRepository.addEvent(event);
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

  public static async getAllEvents(
    _req: Request,
    res: Response
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

  public static async editEvent(req: Request, res: Response): Promise<void> {
    try{
      const oldEvent= await EventRepository.findEvent(req.body.codi);
      if (!oldEvent) {
        res.status(404).json({message: 'Evento no encontrado'});
        return;
        }
      const newEvent: IEvent = {
        id: oldEvent.id,
        codi:oldEvent.codi,
        denominacio: req.body.denominacio || oldEvent.denominacio,
        descripcio: req.body.descripcio || oldEvent.descripcio,
        dataIni: req.body.dataIni || oldEvent.dataIni,
        dataFi: req.body.dataFi || oldEvent.dataFi,
        horari: req.body.horari || oldEvent.horari,
        adress: req.body.adress || oldEvent.adress,
        url: req.body.url || oldEvent.adress,
        chat:oldEvent.chat,
        participants:oldEvent.participants,
      };
      //await EventRepository.findEvent(req.body.codi);
      

      await EventRepository.editarEvent(oldEvent, newEvent);
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
      const event: IEvent = await EventRepository.findEvent(codiEvent);
      const newParticipant: IUser = await UserRepository.findUserByUserId(username);
      if(!event || !newParticipant){
        res.status(404);
        res.json({
          message: 'user or event not found'
        });
      }
      const participants: IUser[] = await EventRepository.addParticipant(event, newParticipant);
      
      res.status(200);
      res.json({
        participants,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
