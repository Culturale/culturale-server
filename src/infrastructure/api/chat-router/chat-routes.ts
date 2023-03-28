import type { Request, Response } from "express";
import express from "express";

import { ChatController } from "~/application";
import { createChatDto } from "~/infrastructure/dtos";

export const chatRouter = express.Router();

chatRouter.get("/test-chat", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.json({
    hello: "you",
  });
});

chatRouter.post("/chat/create", createChatDto, ChatController.createEmptyChat);
