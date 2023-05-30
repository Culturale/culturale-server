import express from 'express';

import { UserController } from '~/application/controllers';
import { logIn, follow, deleteUser} from '~/application/use-cases';
import { like } from '~/application/use-cases/like-event/like';
import { unfollow } from '~/application/use-cases/unfollow-user/unfollow';
import { createUserDto, editUserDTO, loginDto, followDto, changePasswordDto, addFavouriteDto} from '~/infrastructure/dtos';
import { authMiddleware } from '~/infrastructure/middlewares';

export const userRouter = express.Router();

userRouter.post('/users/create', createUserDto, UserController.createUser);

userRouter.get('/users', authMiddleware, UserController.getAllUsers);

userRouter.get('/users/reported', UserController.getReportedUsers);

userRouter.put('/users/reportUser', UserController.ReportUser);

userRouter.post('/users/login', loginDto, logIn);

userRouter.post('/users/edit', editUserDTO, UserController.editUser); //falta test ruta

userRouter.get('/users/username/:id', UserController.getUserForUsername);

userRouter.post('/users/newFollower', followDto, follow); //falta test ruta

userRouter.delete('/users/deleteFollower', followDto, unfollow); //falta test ruta

userRouter.post('/users/addFavourite', addFavouriteDto, like); //falta test tot

userRouter.delete('/users/deleteFavourite', UserController.deleteFavourite); //falta test tot

userRouter.patch('/users/:id/changePassword', changePasswordDto, UserController.changePassword);

userRouter.delete('/users/deleteUser', deleteUser); 

