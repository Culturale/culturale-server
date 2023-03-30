import type { Request, Response } from 'express';
import express from 'express';

import { EventController } from '~/application';
import { createEventDto } from '~/infrastructure/dtos';

export const eventRouter = express.Router();

eventRouter.get('/test-event', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.json({
    hello: 'you',
  });
});

eventRouter.post('/events/create', createEventDto, EventController.createEvent);

//GET /events
eventRouter.get('/events', EventController.getAllEvents);
//GET /events/denominacio/:denominacio
eventRouter.get('/events/denominacio/:denominacio', EventController.getEventbydenominacio);
//GET /events/dataIni/:dataIni
eventRouter.get('/events/dataIni/:dataIni', EventController.getEventbydataIni);
//GET /events/dataFi/:dataFi
eventRouter.get('/events/dataFi/:dataFi', EventController.getEventbydataFi);