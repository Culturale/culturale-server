import type { Request, Response } from 'express';

import type { IChat } from '~/domain/entities/chat';
import { ChatRepository } from '~/domain/repositories/chat-repository/chat-repository';

export class ChatController {
  public static async createEmptyChat(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const chat: IChat = await ChatRepository.createEmptyChat();
      res.status(200);
      res.json({
        chat,
      });
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
}
