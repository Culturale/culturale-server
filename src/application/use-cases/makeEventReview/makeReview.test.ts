
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

  const createTestEvent = async (req: Request): Promise<string> => {
    const res = {} as unknown as Response;
    let eventId: string;
  
    res.json = jest.fn().mockImplementation((data: any) => {
      eventId = data.event.id;
    });
    res.status = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn();
  
    await EventController.createEvent(req, res);
    return eventId;
  };
  
  describe('Make Review', function () { 
    let eventId: string ;

    const expressRequest: Request = {} as Request;
    
    
    const resMessage = {} as unknown as Response;
    resMessage.json = jest.fn();
    resMessage.status = jest.fn(() => resMessage);
    resMessage.setHeader = jest.fn();
    
    beforeEach(async function () {
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
      // Crear el evento y guardar su id en la variable eventId
      eventId = await createTestEvent(req);
      
    });
    

    it('returns the valoration sent it', async function () {
      const reqMessage: Request = JSON.parse(JSON.stringify(expressRequest));
      reqMessage.body = {
        author: 'user1',
        eventId: eventId,
        puntuation: 5,
        comment: '10/ 10, recomanable'
     };
     const reviewRes = {} as unknown as Response;
     reviewRes.json = jest.fn();
     reviewRes.status = jest.fn(() => reviewRes);
     reviewRes.setHeader = jest.fn();
      await makeReview(reqMessage, reviewRes);
  
      expect(reviewRes.status).toBeCalledWith(200);
      expect(reviewRes.json).toBeCalledWith(expect.objectContaining({
        message: 'Valoracion añadida correctamente',
        newValoracioDTO: {
          author: 'user1',
          eventId: eventId,
          puntuation: 5,
          comment: '10/ 10, recomanable',
        }
      }));
    }); 
  });
  describe('Make Review by an user that already made a review', function () { 
    let eventId: string ;

    const expressRequest: Request = {} as Request;
    
    
    const resMessage = {} as unknown as Response;
    resMessage.json = jest.fn();
    resMessage.status = jest.fn(() => resMessage);
    resMessage.setHeader = jest.fn();
    
    beforeEach(async function () {
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
      // Crear el evento y guardar su id en la variable eventId
      eventId = await createTestEvent(req);
      
    });
    

    it('returns the valoration sent it', async function () {
      const reqMessage: Request = JSON.parse(JSON.stringify(expressRequest));
      reqMessage.body = {
        author: 'user1',
        eventId: eventId,
        puntuation: 5,
        comment: '10/ 10, recomanable'
     };
     const reviewRes = {} as unknown as Response;
     reviewRes.json = jest.fn();
     reviewRes.status = jest.fn(() => reviewRes);
     reviewRes.setHeader = jest.fn();
     const reviewRes2 = {} as unknown as Response;
     reviewRes2.json = jest.fn();
     reviewRes2.status = jest.fn(() => reviewRes2);
     reviewRes2.setHeader = jest.fn();
      await makeReview(reqMessage, reviewRes);
      await makeReview(reqMessage, reviewRes2);
      expect(reviewRes2.status).toBeCalledWith(403);
      expect(reviewRes2.json).toBeCalledWith(expect.objectContaining({
        message: 'Usuario user1 ya ha valorado este evento',
      }));
    }); 
  });

    
  });