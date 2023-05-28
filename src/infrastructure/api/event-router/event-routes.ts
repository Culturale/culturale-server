import express from 'express';

import { EventController } from '~/application';
import { checkin } from '~/application/use-cases/check-in';
import { makeReview } from '~/application/use-cases/makeEventReview';
import { createEventDto, editEventDTO, addParticipantDto, addAssistentDto} from '~/infrastructure/dtos';
import { makeReviewDTO } from '~/infrastructure/dtos/make-review.dto';

export const eventRouter = express.Router();

eventRouter.post('/events/create', createEventDto, EventController.createEvent);

eventRouter.post('/events/newMessage', EventController.addMessageEvent);

eventRouter.post('/events/newParticipant', addParticipantDto, EventController.addParticipant);

eventRouter.post('/events/:id/newAssistent', addAssistentDto, checkin);

eventRouter.delete('/events/deleteParticipant', EventController.deleteParticipant);

eventRouter.get('/events/:id/messages', EventController.getAllMessages);
eventRouter.get('/events', EventController.getAllEvents);

//GET /event/denominacio/:denominacio
eventRouter.get('/events/denominacio/:denominacio', EventController.getEventbydenominacio);

//GET /event/dataIni/:dataIni
eventRouter.get('/events/dataIni/:dataIni', EventController.getEventbydataIni);
//GET /events/dataFi/:dataFi
eventRouter.get('/events/dataFi/:dataFi', EventController.getEventbydataFi);
//GET /events/categoria/:categoria
eventRouter.get('/events/categoria/:categoria', EventController.getEventbycategoria);

eventRouter.post('/events/edit', editEventDTO, EventController.editEvent );

eventRouter.post('/events/addReview', makeReviewDTO, makeReview );
eventRouter.post('/events/delete', EventController.deleteEvent );
