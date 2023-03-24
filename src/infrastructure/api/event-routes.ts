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

eventRouter.get("/events", EventController.getAllEvents);

//GET /event/:denominacio
eventRouter.get('/events/denominacio/:denominacio', EventController.getEventbydenominacio);

//GET /event/:dataIni
eventRouter.get('/events/dataIni/:dataIni', EventController.getEventbydataIni);

//GET /event/:dataFi
eventRouter.get('/events/dataFi/:dataFi', EventController.getEventbydataFi);