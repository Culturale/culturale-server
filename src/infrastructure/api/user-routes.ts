import type { Request, Response } from 'express';
import express from 'express';

import { UserController } from '~/application';
import { logIn } from '~/application/use-cases';
import { createUserDto, editUserDTO, loginDto} from '~/infrastructure/dtos';
import { authMiddleware } from '~/infrastructure/middlewares';

export const userRouter = express.Router();

userRouter.get('/test-user', authMiddleware, (req: Request, res: Response) => {
  res.status(200);
  res.json({
    hello: 'you',
  });
});

userRouter.post('/users/create', createUserDto, UserController.createUser);

userRouter.get('/users', UserController.getAllUsers);

userRouter.post('/users/edit', editUserDTO, UserController.editUser);

userRouter.post('/users/login', loginDto, logIn);

userRouter.get('/users/username', UserController.getUserForUsername);