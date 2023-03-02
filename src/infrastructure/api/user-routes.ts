import express, { Request, Response } from 'express';

export const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  console.log('test user router', req, res);
});
