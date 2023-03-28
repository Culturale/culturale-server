import type { Request, Response } from "express";

import type { Chat, IChat } from "~/domain/entities/chat";
import type { IEvent } from "~/domain/entities/event";
import type { IMessage } from "~/domain/entities/message";
import { ChatRepository } from "~/domain/repositories/chat-repository/chat-repository";
import { EventRepository } from "~/domain/repositories/event-repository/event-repository";
import { MessageRepository } from "~/domain/repositories/message-repository/message-repository";

export class EventController {
  public static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event: IEvent = req.body;
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

  public static async addMessageEvent(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const codiEvent = req.body.codi;
      const message: IMessage = await MessageRepository.create(
        req.body.content,
        req.body.date,
        req.body.userId
      );
      const chatEvent: IChat = await EventRepository.getChatEvent(codiEvent);
      const chat: Chat = await ChatRepository.addMessage(chatEvent, message);
      await EventRepository.modifyChatEvent(codiEvent, chat);
      res.status(200);
      res.json({
        message: "message was sent it",
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
