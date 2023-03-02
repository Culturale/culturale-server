import express, { Request, Response } from 'express';

export const userRouter = express.Router();

userRouter.get('/', (_req: Request, _res: Response) => {
  console.log('test user router');
});
