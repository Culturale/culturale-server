import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

dotenv.config();

import { UserModel } from '~/domain/entities/user';

import { logIn } from './log-in';

describe('LogIn use case', function () {
  beforeAll(async function () {
    const mongod = await MongoMemoryServer.create();
    const dbUrl = mongod.getUri();
    await mongoose.connect(dbUrl);
  });

  afterAll(async function () {
    await mongoose.connection.close();
  });

  it('if the user with username does not exist returns an error', async function () {
    const req: Request = expressRequest;
    req.body = {
      username: 'test-username',
      password: 'test-password',
    };
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    await logIn(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: `Username ${req.body.username} not found`,
    });
  });

  it('if the password for username is incorrect returns an error', async function () {
    await UserModel.create({
      username: 'test-username',
      email: 'test@email.com',
      password: 'test-password',
    });
    const req: Request = expressRequest;
    req.body = {
      username: 'test-username',
      password: 'incorrect-password',
    };
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    await logIn(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ error: 'Incorrect password' });
  });

  it('if the username and password are correct returns a token', async function () {
    const req: Request = expressRequest;
    req.body = {
      username: 'test-username',
      password: 'test-password',
    };
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    await logIn(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalled();
  });
});
