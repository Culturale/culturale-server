/* eslint-disable quotes */
/* eslint-disable no-console */
import { emitWarning } from 'process';

import type { Request, Response } from 'express';

import type { Chat, IChat } from '~/domain/entities/chat';
import type { IEvent } from '~/domain/entities/event';
import type { IMessage } from '~/domain/entities/message';
import { ChatRepository } from '~/domain/repositories/chat-repository/chat-repository';
import { EventRepository } from '~/domain/repositories/event-repository/event-repository';
import { MessageRepository } from '~/domain/repositories/message-repository/message-repository';

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

  public static async addMessageEvent(
    req: Request,
    res: Response
  ): Promise<void> {
    emitWarning("a");
    try {
      const codiEvent = req.body.codi;
      console.log("A");
      const chatEvent: IChat = await EventRepository.getChatEvent(codiEvent);
      console.log("A");
      const newMessage: IMessage = await MessageRepository.addMessage(req.body.content, req.body.userId, req.body.data);
      console.log("A");
      const chat: Chat = await ChatRepository.addMessage(chatEvent, newMessage);
      console.log("A");
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
