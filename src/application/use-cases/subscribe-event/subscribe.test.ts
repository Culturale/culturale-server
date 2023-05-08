import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { EventController, UserController } from '~/application/controllers';

dotenv.config();

import { subscribe } from './subscribe';

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

    const reqAddPar: Request = JSON.parse(JSON.stringify(expressRequest));
    reqAddPar.body = {
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
    const resAddPar = {} as unknown as Response;
    resAddPar.json = jest.fn();
    resAddPar.status = jest.fn(() => resAddPar);
    resAddPar.setHeader = jest.fn();
    
    beforeEach(async function () {
      await UserController.createUser(reqUser, resUser);
      await EventController.createEvent(reqAddPar, resAddPar);
    });

    it('The user should be able to subscribe into an event', async function () {
        const req: Request = expressRequest;
        req.body = {
            codi: 12348173050,
            username: 'test-username',
        };
        const res = {} as unknown as Response;
        res.json = jest.fn();
        res.status = jest.fn(() => res);
        res.setHeader = jest.fn();

        await subscribe(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
        message:'User subscribed successfully',
        });
    });
});
