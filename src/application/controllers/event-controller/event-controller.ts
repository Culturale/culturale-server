import type { Request, Response } from "express";

import type { Chat } from "~/domain/entities/chat";
import type { IEvent } from "~/domain/entities/event";
import { ChatRepository } from "~/domain/repositories/chat-repository/chat-repository";
import { EventRepository } from "~/domain/repositories/event-repository/event-repository";

export class EventController {
  public static async createEvent(req: Request, res: Response): Promise<void> {
    try {

      let event: IEvent;
      event.codi = req.body.codi;
      event.denominacio = req.body.denominacio;
      event.descripcio = req.body.descripcio;
      event.dataIni = new Date(req.body.dataIni);
      event.dataFi = new Date(req.body.dataFi);
      event.horari = req.body.horari;
      event.adress = req.body.adress;
      event.url = req.body.url;

      const chat: Chat = await ChatRepository.createEmptyChat();
      await EventRepository.addEvent(event, chat);
      res.status(200);
      res.json({
        message: "event created",
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

  public static async removeEvent(req: Request, res: Response): Promise<void> {
    try {
      const codiEvent: string = req.body.codiEvent;
      const codiChat: string = await EventRepository.getChat(codiEvent);
      await EventRepository.removeEvent(codiEvent);
      await ChatRepository.removeChat(codiChat);
      res.status(200);
      res.json({
        message: "event removed",
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
