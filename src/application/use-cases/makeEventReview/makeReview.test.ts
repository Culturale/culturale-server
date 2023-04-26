
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

  
  describe('Make Review', function () { 
    const expressRequest: Request = {} as Request;
    const reqMessage: Request = JSON.parse(JSON.stringify(expressRequest));
    reqMessage.body = {
      author: "user1",
      eventCode: 12348173050,
      puntuation: 5,
      comment: "10/ 10, recomanable"
    };
    
    const resMessage = {} as unknown as Response;
    resMessage.json = jest.fn();
    resMessage.status = jest.fn(() => resMessage);
    resMessage.setHeader = jest.fn();
    
    beforeEach(async function () {
    await  makeReview(reqMessage, resMessage);
    });
    

    it('returns the valoration sent it', function () {
      expect(resMessage.status).toBeCalledWith(200);
      expect(resMessage.json).toBeCalledWith(expect.objectContaining({
        message: 'Valoracion añadida correctamente',
        newValoracioDTO: {
          author: "user1",
          eventCode: 12348173050,
          puntuation: 5,
          comment: "10/ 10, recomanable",
        }
      }));
    }); 
  });

  describe('Make Review', function () { 
    const expressRequest: Request = {} as Request;
    const reqMessage: Request = JSON.parse(JSON.stringify(expressRequest));
    reqMessage.body = {
      author: "user1",
      eventCode: 12348173050,
      puntuation: 1,
      comment: "0/ 10,no recomanable"
    };
    
    const resMessage = {} as unknown as Response;
    resMessage.json = jest.fn();
    resMessage.status = jest.fn(() => resMessage);
    resMessage.setHeader = jest.fn();
    
    beforeEach(async function () {
    await  makeReview(reqMessage, resMessage);
    });
    

    it('returns error as the user already valorated the event', function () {
      expect(resMessage.status).toBeCalledWith(404);
      expect(resMessage.json).toBeCalledWith(expect.objectContaining({
        message: 'Usuario user1 ya ha valorado este evento',
      }));
    }); 
  });

});