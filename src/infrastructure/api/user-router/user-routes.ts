import express from 'express';

import { UserController } from '~/application/controllers';
import { logIn, follow} from '~/application/use-cases';
import { unfollow } from '~/application/use-cases/unfollow-user/unfollow';
import { createUserDto, editUserDTO, loginDto, followDto, changePasswordDto, deleteUserDto} from '~/infrastructure/dtos';
import { authMiddleware } from '~/infrastructure/middlewares';

export const userRouter = express.Router();

userRouter.post('/users/create', createUserDto, UserController.createUser);

userRouter.get('/users', authMiddleware, UserController.getAllUsers);

userRouter.post('/users/login', loginDto, logIn);

userRouter.delete('/users/delete/:id', deleteUserDto, UserController.deleteUser);

userRouter.post('/users/edit', editUserDTO, UserController.editUser); //falta test ruta

userRouter.get('/users/username/:id', UserController.getUserForUsername);

userRouter.post('/users/newFollower', followDto, follow); //falta test ruta

userRouter.delete('/users/deleteFollower', followDto, unfollow); //falta test ruta

userRouter.patch('/users/:id/changePassword', changePasswordDto, UserController.changePassword);