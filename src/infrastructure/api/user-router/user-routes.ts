import express from 'express';

import { UserController } from '~/application/controllers';
import { logIn } from '~/application/use-cases';
import { createUserDto, editUserDTO, loginDto } from '~/infrastructure/dtos';
import { authMiddleware } from '~/infrastructure/middlewares';

export const userRouter = express.Router();

userRouter.post('/users/create', createUserDto, UserController.createUser);

userRouter.get('/users', authMiddleware, UserController.getAllUsers);

userRouter.post('/users/login', loginDto, logIn);

userRouter.post('/users/edit', editUserDTO, UserController.editUser);
