
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { UserController } from '~/application/controllers';
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
  const createTestUser = async (req: Request): Promise<string> => {
    const res = {} as unknown as Response;
    let userId: string;
  
    res.json = jest.fn().mockImplementation((data: any) => {
      userId = data.user.id;
    });
    res.status = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn();
  
    await UserController.createUser(req, res);
    return userId;
  };
  
  describe('Make Review', function () { 
    let eventId: string ;
    let userId: string ;

    const expressRequest: Request = {} as Request;
    const resMessage = {} as unknown as Response;
    resMessage.json = jest.fn();
    resMessage.status = jest.fn(() => resMessage);
    resMessage.setHeader = jest.fn();
    
    beforeEach(async function () {
    const reqEvent: Request = expressRequest;
    reqEvent.body = {
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
      eventId = await createTestEvent(reqEvent);

      const reqUser: Request = expressRequest;
      reqUser.body = {
        username: 'Maci02',
        name: 'Joel',
        password: '1234',
        email:  'joel@joel.com',
        profilePicture: 'calamardo.png',
        phoneNumber:'666555444',
        usertype: 'usuario',
      };
      
      userId = await createTestUser(reqUser);
    });
    

    it('returns the valoration sent it', async function () {
      const reqMessage: Request = JSON.parse(JSON.stringify(expressRequest));
      reqMessage.body = {
        authorId: userId,
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
          authorId: userId,
          eventId: eventId,
          puntuation: 5,
          comment: '10/ 10, recomanable',
        }
      }));
    }); 
  });
  describe('Make Review by an user that already made a review', function () { 
    let eventId: string ;
    let userId: string ;
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


      const reqUser: Request = expressRequest;
      reqUser.body = {
        username: 'Maci02',
        name: 'Joel',
        password: '1234',
        email:  'joel@joel.com',
        profilePicture: 'calamardo.png',
        phoneNumber:'666555444',
        usertype: 'usuario',
      };
      
      userId = await createTestUser(reqUser);
      
    });
    

    it('returns the valoration sent it', async function () {
      const reqMessage: Request = JSON.parse(JSON.stringify(expressRequest));
      reqMessage.body = {
        authorId: userId,
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
        message: 'El usuario ya ha valorado este evento',
      }));
    }); 
  });

    
  });