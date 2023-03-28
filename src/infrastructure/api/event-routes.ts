import type { Request, Response } from "express";
import express from "express";

import { EventController } from "~/application";
import { createEventDto } from "~/infrastructure/dtos";

export const eventRouter = express.Router();

eventRouter.get("/test-event", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.json({
    hello: "you",
  });
});

eventRouter.post("/events/create", createEventDto, EventController.createEvent);

eventRouter.post("/events/newMessage", EventController.addMessageEvent);

eventRouter.get("/events", EventController.getAllEvents);
