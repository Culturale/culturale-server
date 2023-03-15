import express, { Request, Response } from 'express';

export const userRouter = express.Router();

userRouter.get('/test-user', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.json({
    hello: 'you',
  });
});
