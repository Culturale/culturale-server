import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import {
  EventController,
  UserController 
} from '~/application/controllers';
import { checkin } from './check-in';

dotenv.config();

describe('Check in use case', function () {
  beforeAll(async function () {
    const mongod = await MongoMemoryServer.create();
    const dbUrl = mongod.getUri();
    await mongoose.connect(dbUrl);
  });

  afterAll(async function () {
    await mongoose.connection.close();
  });

  const data = {
    username: 'test-username',
    eventID: '0',
    event_lat: 0,
    event_long: 0
  };
  
  const expressRequest: Request = {} as Request;
  const reqUser: Request = JSON.parse(JSON.stringify(expressRequest));
  reqUser.body = {
    email: 'email@example.com',
    password: 'test-password',
    username: data.username,
    name: 'test-name',
    profilePicture: 'test-imageurl',
    phoneNumber: '000000000',
    usertype: 'usuario',
  };
  const resUser = {} as unknown as Response;
  resUser.json = jest.fn();
  resUser.status = jest.fn(() => resUser);
  resUser.setHeader = jest.fn();

  const reqEvent: Request = JSON.parse(JSON.stringify(expressRequest));
  reqEvent.body = {
    codi: 12348173050,
    denominacio: 'test-event',
    descripcio: 'test-description',
    dataIni: new Date(1),
    dataFi: new Date(2),
    horari: '2h',
    adress: 'Passeig de Gràcia',
    url: 'https://test-url.com',
    lat: data.event_lat,
    long: data.event_long,
    categoria: 'agenda:categories/teatre'
  };
  const resEvent = {} as unknown as Response;
  resEvent.json = jest.fn();
  resEvent.status = jest.fn(() => resEvent);
  resEvent.setHeader = jest.fn();

  beforeAll(async function () {
    await UserController.createUser(reqUser, resUser);
    await EventController.createEvent(reqEvent, resEvent);
    const obj = (resEvent.json as jest.Mock).mock.calls[(resEvent.json as jest.Mock).mock.calls.length - 1][0];
    data.eventID = obj.event._id;
  });

  it('Case user and event doesnt exist', async function() {
    const req: Request = expressRequest;
    req.body = {
      username: 'no user',
      user_lat: 0,
      user_long: 0
    };
    req.params = {id: '000000000000000000000000'};

    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    await checkin(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      message: 'Usuario o evento no encontrado'
    });
  });

  it('Case user doesnt exist', async function() {
    const req: Request = expressRequest;
    req.body = {
      username: 'no user',
      user_lat: 0,
      user_long: 0
    };
    req.params = {id: data.eventID};

    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    await checkin(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      message: 'Usuario o evento no encontrado'
    });
  });

  it('Case event doesnt exist', async function() {
    const req: Request = expressRequest;
    req.body = {
      username: data.username,
      user_lat: 0,
      user_long: 0
    };
    req.params = {id: '000000000000000000000000'};

    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    await checkin(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      message: 'Usuario o evento no encontrado'
    });
  });

  it('Case user too far away to check in', async function() {
    const req: Request = expressRequest;
    req.body = {
      username: data.username,
      user_lat: data.event_lat,
      user_long: data.event_long + 1
    };
    req.params = {id: data.eventID};

    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    await checkin(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: 'Usuario demasiado lejos para asistir'
    });
  });

  it('Case user can check in', async function() {
    const newUsername = 'test-username2';
    const reqUser2: Request = JSON.parse(JSON.stringify(expressRequest));
    reqUser2.body = {
      email: 'email@example.com',
      password: 'test-password',
      username: newUsername,
      name: 'test-name',
      profilePicture: 'test-imageurl',
      phoneNumber: '000000000',
      usertype: 'usuario',
    };
    const resUser2 = {} as unknown as Response;
    resUser2.json = jest.fn();
    resUser2.status = jest.fn(() => resUser2);
    resUser2.setHeader = jest.fn();
    await UserController.createUser(reqUser2, resUser2);


    const req: Request = expressRequest;
    req.body = {
      username: newUsername,
      user_lat: data.event_lat,
      user_long: data.event_long
    };
    req.params = {id: data.eventID};

    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    await checkin(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      message: 'Asistente añadido correctamente'
    });
  });

  it('Case user cant check in two times in the same event', async function() {
    const newUsername = 'test-username3';
    const reqUser2: Request = JSON.parse(JSON.stringify(expressRequest));
    reqUser2.body = {
      email: 'email@example.com',
      password: 'test-password',
      username: newUsername,
      name: 'test-name',
      profilePicture: 'test-imageurl',
      phoneNumber: '000000000',
      usertype: 'usuario',
    };
    const resUser2 = {} as unknown as Response;
    resUser2.json = jest.fn();
    resUser2.status = jest.fn(() => resUser2);
    resUser2.setHeader = jest.fn();
    await UserController.createUser(reqUser2, resUser2);


    const req: Request = expressRequest;
    req.body = {
      username: newUsername,
      user_lat: data.event_lat,
      user_long: data.event_long
    };
    req.params = {id: data.eventID};

    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    // Primer check in que funciona correctamente
    await checkin(req, res);

    // Segundo check in donde genera el error
    await checkin(req, res);

    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith({
      message: 'El usuario ya asiste a este evento'
    });
  });
});
