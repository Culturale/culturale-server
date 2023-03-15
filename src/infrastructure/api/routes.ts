import express from "express";

import { userRouter } from "./user-routes";

export const routes = express.Router();

routes.use(userRouter);
