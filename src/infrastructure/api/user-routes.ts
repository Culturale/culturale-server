import express, { Request, Response } from 'express';

export const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  console.log('test user router', req, res);
});

userRouter.get('/informacion_usuario', (req: Request, res: Response) => {
  console.log('inf user', req, res);
});
