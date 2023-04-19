import type { Request, Response } from 'express';

import type { Chat, IChat } from '~/domain/entities/chat';
import type { EventProps, IEvent } from '~/domain/entities/event';
import { Event } from '~/domain/entities/event';
import type { IMessage } from '~/domain/entities/message';
import { IUser } from '~/domain/entities/user';
import { UserRepository } from '~/domain/repositories';
import { ChatRepository } from '~/domain/repositories/chat-repository/chat-repository';
import { EventRepository } from '~/domain/repositories/event-repository/event-repository';
import { MessageRepository } from '~/domain/repositories/message-repository/message-repository';
import { EditEventDTO } from '~/infrastructure';

export class EventController {
  public static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event: Event = req.body;
      console.log(event);
      const chat: Chat = await ChatRepository.createEmptyChat();
      console.log(chat);
      const eventCreated = await EventRepository.addEvent(event, chat);
      console.log(eventCreated);
      res.status(200);
      res.json({
        message: 'event created',
        event: eventCreated,
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
      const editEventDTO: EditEventDTO = req.body;
      const oldEvent = await EventRepository.findEvent(req.body.codi);
      if (!oldEvent) {
        res.status(404).json({message: 'Evento no encontrado'});
        return;
        }
        const newEvent = new Event({
          id: oldEvent.id, 
          codi: oldEvent.codi,
          denominacio: editEventDTO.denominacio || oldEvent.denominacio,
          descripcio: editEventDTO.descripcio || oldEvent.descripcio,
          dataIni: editEventDTO.dataIni || oldEvent.dataIni,
          dataFi: editEventDTO.dataFi || oldEvent.dataFi,
          horari: editEventDTO.horari || oldEvent.horari,
          adress: editEventDTO.adress || oldEvent.adress,
          url: editEventDTO.url || oldEvent.adress,
          chat: oldEvent.chat
        });

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