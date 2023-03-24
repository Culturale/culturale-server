import type { Request, Response } from "express";

import type { IEvent } from "~/domain/entities/event";
import { EventRepository } from "~/domain/repositories/event-repository/event-repository";

export class EventController {
  public static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event: IEvent = req.body;
      await EventRepository.addEvent(event);
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
}
