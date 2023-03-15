import express, { Request, Response } from 'express';
import { UserController } from '~/application';
import { CreateUserDto } from '~/infrastructure/dtos';
import { validate } from 'class-validator';
import { IUser } from '~/domain/entities/user';

export const userRouter = express.Router();

userRouter.get('/test-user', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.json({
    hello: 'you',
  });
});

userRouter.post('/users/create', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const createUserDto = new CreateUserDto();
    createUserDto.email = req.body.email;
    createUserDto.username = req.body.username;

    const errors = await validate(createUserDto);
    if (errors.length) {
      res.status(400).json({ errors });
      return;
    }

    const user: IUser = req.body;

    UserController.createUser(user);
    res.status(200);
    res.json({
      message: 'user created',
    });
  } catch (e) {
    res.status(500);
    res.json({
      error: e,
    });
  }
});

userRouter.get('/users', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const users: IUser[] = await UserController.getAllUsers();

    res.status(200);
    res.json({
      users: users,
    });
  } catch (e) {
    res.status(500);
    res.json({
      error: e,
    });
  }
});
