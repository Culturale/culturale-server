import express from 'express';

import { EventController } from '~/application';
import { makeReview } from '~/application/use-cases/makeEventReview';
import { createEventDto, editEventDTO } from '~/infrastructure/dtos';
import { makeReviewDTO } from '~/infrastructure/dtos/make-review.dto';

export const eventRouter = express.Router();

eventRouter.post('/events/create', createEventDto, EventController.createEvent);
eventRouter.post('/events/newMessage', EventController.addMessageEvent);
eventRouter.post('/events/newParticipant', EventController.addParticipant);

eventRouter.get('/events/messages', EventController.getAllMessages);

eventRouter.get('/events', EventController.getAllEvents);

eventRouter.post('/events/edit', editEventDTO, EventController.editEvent );

eventRouter.post('/events/addReview', makeReviewDTO, makeReview );
eventRouter.post('/events/delete', EventController.deleteEvent );
