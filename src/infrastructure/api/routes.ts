import express from 'express';

import { eventRouter } from './event-router';
import { userRouter } from './user-router';
import { chatRouter } from './chat-router';

export const routes = express.Router();

routes.use(userRouter);
routes.use(eventRouter);
routes.use(chatRouter);
