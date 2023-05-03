import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { UserController } from '../user-controller';

import { EventController } from './event-controller';

dotenv.config();

describe('Event Controller', function () {
  beforeAll(async function () {
    const mongod = await MongoMemoryServer.create();
    const dbUrl = mongod.getUri();
    await mongoose.connect(dbUrl);
  });

  afterAll(async function () {
    await mongoose.connection.close();
  });

  describe('createEvent', function () {
    const req: Request = expressRequest;
    req.body = {
        codi: 12348173050,
        denominacio: 'test-event',
        descripcio: 'test-description',
        dataIni: new Date(1),
        dataFi: new Date(2),
        horari: '2h',
        adress: 'Passeig de Gràcia',
        url: 'https://test-url.com',
    };
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    beforeEach(async function () {
      await EventController.createEvent(req, res);
    });

    it('returns the correct payload', function () {
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        message: 'event created',
        event: expect.objectContaining({
          codi: 12348173050,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          url: 'https://test-url.com',
        }),
      });
    });
  });

  describe('getAllEvents', function () {
    
    const req: Request = expressRequest;
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    beforeEach(async function () {
      await EventController.getAllEvents(req, res);
    });

    it('returns all events', function () {
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        events: [
          expect.objectContaining({
            codi: 12348173050,
            denominacio: 'test-event',
            descripcio: 'test-description',
            dataIni: new Date(1),
            dataFi: new Date(2),
            horari: '2h',
            adress: 'Passeig de Gràcia',
            url: 'https://test-url.com',
          }),
        ],
      });
    });
  });
  describe('add message event', function () { 
    const expressRequest: Request = {} as Request;
    const reqMessage: Request = JSON.parse(JSON.stringify(expressRequest));
    reqMessage.body = {
        codi: 12348173050,
        userId: 'user1',
        content: 'hola',
        date: new Date(2),
    };
    const resMessage = {} as unknown as Response;
    resMessage.json = jest.fn();
    resMessage.status = jest.fn(() => resMessage);
    resMessage.setHeader = jest.fn();
    
    beforeEach(async function () {
        await EventController.addMessageEvent(reqMessage, resMessage);
    });

    it('returns the message sent it', function () {
      expect(resMessage.status).toBeCalledWith(200);
      expect(resMessage.json).toBeCalledWith(expect.objectContaining({
        message: 'chat sent it',
        messages: expect.objectContaining({
          userId: 'user1',
          content: 'hola',
          date: new Date(2),
        }),
      }));
    }); 
  });

  describe('add participant event', function () { 
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
        username: 'test-username',
    };
    const resAddPar = {} as unknown as Response;
    resAddPar.json = jest.fn();
    resAddPar.status = jest.fn(() => resAddPar);
    resAddPar.setHeader = jest.fn();
    
    beforeEach(async function () {
      await UserController.createUser(reqUser, resUser);
      await EventController.addParticipant(reqAddPar, resAddPar);
    });

    it('returns the participants', function () {
      expect(resAddPar.status).toBeCalledWith(200);
      expect(resAddPar.json).toBeCalledWith(expect.objectContaining({
        message: 'Participante añadido correctamente',
      }));
    }); 
  });
  describe('deleteEvent', function () {
    const expressRequest: Request = {} as Request;
    const req: Request = JSON.parse(JSON.stringify(expressRequest));
    req.body = {
        id: 12348173655,
    };
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    const reqCreate: Request = JSON.parse(JSON.stringify(expressRequest));
    reqCreate.body = {
        codi: 12348173655,
        denominacio: 'test-event',
        descripcio: 'test-description',
        dataIni: new Date(1),
        dataFi: new Date(2),
        horari: '2h',
        adress: 'Passeig de Gràcia',
        url: 'https://test-url.com',
    };
    const resCreate = {} as unknown as Response;
    resCreate.json = jest.fn();
    resCreate.status = jest.fn(() => resCreate);
    resCreate.setHeader = jest.fn();
    beforeEach(async function () {
      await EventController.createEvent(reqCreate, resCreate);
      await EventController.deleteEvent(req, res);
    });

    it('returns the correct payload', function () {
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        message: 'event deleted',
      });
    });
  });

});