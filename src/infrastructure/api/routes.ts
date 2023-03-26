import express from "express";

import { chatRouter } from "./chat-routes";
import { eventRouter } from "./event-routes";
import { userRouter } from "./user-routes";

export const routes = express.Router();

routes.use(userRouter);
routes.use(eventRouter);
routes.use(chatRouter);
