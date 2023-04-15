import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

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
      codi: 12345678901,
      denominacio: 'test-denominacio',
      descripcio: 'test-descripcio',
      dataIni: new Date(1),
      dataFi: new Date(2),
      horari: 'mati',
      adress: 'Passeig de gracia',
      url: 'test-url',
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
          adress: 'Passeig de gracia',
          codi: 12345678901,
          dataFi: new Date(2),
          dataIni: new Date(1),
          denominacio: 'test-denominacio',
          descripcio: 'test-descripcio',
          horari: 'mati',
          url: 'test-url',
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
            adress: 'Passeig de gracia',
            codi: 12345678901,
            dataFi: new Date(2),
            dataIni: new Date(1),
            denominacio: 'test-denominacio',
            descripcio: 'test-descripcio',
            horari: 'mati',
            url: 'test-url',
          }),
        ],
      });
    });
  });
});