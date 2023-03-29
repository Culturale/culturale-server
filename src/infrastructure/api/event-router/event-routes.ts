import express from 'express';

import { EventController } from '~/application';
import { createEventDto } from '~/infrastructure/dtos';

export const eventRouter = express.Router();

eventRouter.post('/events/create', createEventDto, EventController.createEvent);

eventRouter.get('/events', EventController.getAllEvents);
