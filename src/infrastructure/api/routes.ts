import express from "express";

import { userRouter } from "./user-routes";
import { eventRouter } from "./event-routes";

export const routes = express.Router();

routes.use(userRouter);
routes.use(eventRouter);
