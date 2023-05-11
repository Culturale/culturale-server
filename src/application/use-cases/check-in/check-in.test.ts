import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { EventController, UserController } from '~/application/controllers';

dotenv.config();

import { checkin } from './check-in';

describe('LogIn use case', function () {
  beforeAll(async function () {
    const mongod = await MongoMemoryServer.create();
    const dbUrl = mongod.getUri();
    await mongoose.connect(dbUrl);
  });

  afterAll(async function () {
    await mongoose.connection.close();
  });
  const expressRequest: Request = {} as Request;
    const reqUser: Request = JSON.parse(JSON.stringify(expressRequest));
    reqUser.body = {
      email: 'email@example.com',
      password: 'test-password',
      username: 'test-username',
      name: 'test-name',
      profilePicture: 'test-imageurl',
      phoneNumber: '000000000',
      usertype: 'usuario',
    };
    const resUser = {} as unknown as Response;
    resUser.json = jest.fn();
    resUser.status = jest.fn(() => resUser);
    resUser.setHeader = jest.fn();

    const reqAssPar: Request = JSON.parse(JSON.stringify(expressRequest));
    reqAssPar.body = {
        codi: 12348173050,
        denominacio: 'test-event',
        descripcio: 'test-description',
        dataIni: new Date(1),
        dataFi: new Date(2),
        horari: '2h',
        adress: 'Passeig de Gràcia',
        url: 'https://test-url.com',
        photo: 'test-photo.jpg',
    };
    const resAssPar = {} as unknown as Response;
    resAssPar.json = jest.fn();
    resAssPar.status = jest.fn(() => resAssPar);
    resAssPar.setHeader = jest.fn();

    beforeEach(async function () {
      await UserController.createUser(reqUser, resUser);
      await EventController.createEvent(reqAssPar, resAssPar);
    });

    it('The user should be able to check into an event', async function () {
        const req: Request = expressRequest;
        req.body = {
            codi: 12348173050,
            username: 'test-username',
        };
        const res = {} as unknown as Response;
        res.json = jest.fn();
        res.status = jest.fn(() => res);
        res.setHeader = jest.fn();

        await checkin(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
        message:'User checked in successfully',
        });
    });
});
