import type { Request, Response } from 'express';

import type { Chat } from '~/domain/entities/chat';
import type { IEvent } from '~/domain/entities/event';
import { ChatRepository } from '~/domain/repositories/chat-repository/chat-repository';
import { EventRepository } from '~/domain/repositories/event-repository/event-repository';

export class EventController {
  public static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event: IEvent = req.body;
      const chat: Chat = await ChatRepository.createEmptyChat();
      const eventCreated = await EventRepository.addEvent(event, chat);
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
        chat:oldEvent.chat
      };
      await EventRepository.editarEvent(oldEvent, newEvent);
       res.status(200).json({message: 'Evento editado correctamente'});  
      }
    catch (e) {
        res.status(500);
        res.json({
          error: e,
        });
      }
   }
}
