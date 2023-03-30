import express from 'express';

import { EventController } from '~/application';
import { createEventDto, editParamDTO } from '~/infrastructure/dtos';


export const eventRouter = express.Router();

eventRouter.post('/events/create', createEventDto, EventController.createEvent);
eventRouter.post('/events/newMessage', EventController.addMessageEvent);

eventRouter.get('/events/messages', EventController.getAllMessages);
eventRouter.get('/events', EventController.getAllEvents);

eventRouter.post('/events/edit', editParamDTO, EventController.editEvent );
