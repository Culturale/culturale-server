
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { EventController } from '~/application/controllers/event-controller';
import { makeReview } from './makeReview';


describe('Make Review use case', function () {
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

  describe('Add a valoration', function(){  
    const req: Request = expressRequest;
    req.body = {
      eventCode: 12345678901,
      comment: "Evento perfecto! Muy buena organización, 10/10",
      puntuacion: 5,
      author: "Maci",
    };
    
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();
  
   beforeEach(async function (){
    await makeReview(req, res);
  });

  it('returns the correct payload', function () {
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      message: 'Valoracion añadida correctamente',
      event: expect.objectContaining({
        eventCode: 12345678901,
        comment: "Evento perfecto! Muy buena organización, 10/10",
        puntuacion: 5,
        author: "Maci",
           }),
         });
      });
    });
  });



