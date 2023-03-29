import express from 'express';

import { chatRouter } from './chat-router';
import { eventRouter } from './event-router';
import { userRouter } from './user-router';

export const routes = express.Router();

routes.use(userRouter);
routes.use(eventRouter);
routes.use(chatRouter);
