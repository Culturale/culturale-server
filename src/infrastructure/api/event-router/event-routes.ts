import express from 'express';

import { EventController } from '~/application';
import { buyTicket } from '~/application/use-cases/buy-ticket/buy-ticket';
import { deleteReview } from '~/application/use-cases/deleteReview';
import { makeReview } from '~/application/use-cases/makeEventReview';
import {
  createEventDto,
  editEventDTO,
  addParticipantDto,
  buyTicketDto,
} from '~/infrastructure/dtos';
import { makeReviewDTO } from '~/infrastructure/dtos/make-review.dto';
import { authMiddleware } from '~/infrastructure/middlewares';

export const eventRouter = express.Router();

eventRouter.post('/events/create', createEventDto, EventController.createEvent);

eventRouter.post('/events/newMessage', EventController.addMessageEvent);

eventRouter.post(
  '/events/newParticipant',
  addParticipantDto,
  EventController.addParticipant,
);

eventRouter.delete(
  '/events/deleteParticipant',
  EventController.deleteParticipant,
);

eventRouter.get('/events/:id/messages', EventController.getAllMessages);
eventRouter.get('/events', EventController.getAllEvents);

eventRouter.get('/events/50', EventController.getEventsPag);
eventRouter.get('/events/mapa', EventController.getEventsMapa);

//GET /events/filters
eventRouter.get('/events/filters', EventController.getEventsByFilters);

eventRouter.get(
  '/events/denominacio/:denominacio',
  EventController.getEventbydenominacio,
);

//GET /event/dataIni/:dataIni
eventRouter.get('/events/dataIni/:dataIni', EventController.getEventbydataIni);
//GET /events/dataFi/:dataFi
eventRouter.get('/events/dataFi/:dataFi', EventController.getEventbydataFi);
//GET /events/categoria/:categoria
eventRouter.get(
  '/events/categoria/:categoria',
  EventController.getEventbycategoria,
);

eventRouter.post('/events/edit', editEventDTO, EventController.editEvent);

eventRouter.post('/events/addReview', makeReviewDTO, makeReview);

eventRouter.get(
  '/events/getReportedReviews',
  EventController.getReportedReviews,
);
eventRouter.put('/events/reportReview', EventController.reportReview);
eventRouter.delete('/events/deleteReview', deleteReview);

eventRouter.post('/events/delete', EventController.deleteEvent);

eventRouter.post('/events/buyTicket', authMiddleware, buyTicketDto, buyTicket);
