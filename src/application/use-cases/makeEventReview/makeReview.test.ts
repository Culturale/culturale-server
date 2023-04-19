
import type { Request, Response } from 'express';
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
    const expressRequest: Request = {} as Request;
    const req: Request = JSON.parse(JSON.stringify(expressRequest));
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
      const  x = await EventController.createEvent(req, res);
      console.log(x);
    });


  it('returns the correct payload', async function () {
    const req: Request = JSON.parse(JSON.stringify(expressRequest));
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
  

    await makeReview(req, res);


    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      message: 'Valoracion añadida correctamente',
      event: expect.objectContaining({
        eventCode: 12348173050,
        comment: "Evento perfecto! Muy buena organización, 10/10",
        puntuacion: 5,
        author: "Maci",
           }),
         });
      });
    });



