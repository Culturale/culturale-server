import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '~/server';

describe('Event Routes', function () {
  beforeAll(async function () {
    const mongod = await MongoMemoryServer.create();
    const dbUrl = mongod.getUri();
    await mongoose.connect(dbUrl);
  });

  afterAll(async function () {
    await mongoose.connection.close();
  });

  describe('POST /events/create', function () {
    it('if the payload is correct it creates the event', async function () {
      const res = await request(app)
        .post('/events/create')
        .send({
          codi: 12348173049,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          url: 'https://test-url.com',
        });
      expect(res.statusCode).toBe(200);
    });

    it('if the payload is incorrect returns an error', async function () {
      const res = await request(app).post('/events/create').send({
        codi: 123456789,
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /events', function () {
    beforeEach(async function () {
      await request(app)
        .post('/events/create')
        .send({
          codi: 12348173049,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          url: 'https://test-url.com',
        });
    });

    it('returns the list of events', async function () {
      const res = await request(app).get('/events');

      expect(res.statusCode).toBe(200);
      expect(res.body.events).toHaveLength(2);
    });
  });

  describe('POST events/newMessage', function () {
    it('it sends a new message', async function () {
      const res = await request(app).post('/events/newMessage').send({
        codi: 12348173049,
        userId: 'user1',
        content: 'hola',
        date: new Date(2),
      });
      expect(res.body.message).toBe('chat sent it');
      expect(res.statusCode).toBe(200);
    });
    it('if the payload is incorrect returns an error', async function () {
      const res = await request(app).post('/events/newMessage').send({
        codi: 12348173049,
        content: 'hola',
        date: new Date(2),
      });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('POST /events/edit', function () {
    it('if the payload is correct it modifies the event', async function () {
        await request(app)
        .post('/events/create')
        .send({
          codi: 12348173049,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          url: 'https://test-url.com',
        });

      const res = await request(app)
        .post('/events/edit')
        .send({
          codi: 12348173049,
          denominacio: 'new-test-event',
          descripcio: 'new-test-description',
        });


      expect(res.body.message).toBe('Evento editado correctamente');

      const res2 = await request(app)
      .post('/events/edit')
      .send({
        codi: 12348173040,
        denominacio: 'new-test-event',
        descripcio: 'new-test-description',
      });

      expect(res2.body.message).toBe('Evento no encontrado');

    });
  
    it('if the payload is incorrect returns an error', async function () {
      await request(app)
        .post('/events/create')
        .send({
        codi: 123456789,
        denominacio: 'test-event',
        descripcio: 'test-description',
        dataIni: new Date(1),
        dataFi: new Date(2),
        horari: '2h',
        adress: 'Passeig de Gràcia',
        url: 'https://test-url.com',
      });
  
      const res = await request(app).post('/events/edit').send({
        codi: 123456789,
        denominacio: '',
      });

      expect(res.body.errors).toBeTruthy();

    });
  });


  describe('GET /events/messages', function () { 
    beforeEach(async function () {
    await request(app)
      .post('/events/newMessage')
      .send({
        codi: 12348173049,
        userId: 'user1',
        content: 'hola',
        date: new Date(2),
      });
    });
    it('returns the list of messages', async function () {
      const res = await request(app).get('/events/messages').send({ codi: 12348173049});
      expect(res.statusCode).toBe(200);
      expect(res.body.messages).toHaveLength(2);
    });
  });


});
