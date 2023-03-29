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
}
