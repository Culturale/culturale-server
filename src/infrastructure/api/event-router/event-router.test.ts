import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '~/server';

describe('User Routes', function () {
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
          latitud: 23.45678,
          longitud: 34.5678,
          telefon: 567876567,
          categoria: 'infantil',
          aforament: 10000,
          chat: null,
          assistents: null,
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
          latitud: 23.45678,
          longitud: 34.5678,
          telefon: 567876567,
          categoria: 'infantil',
          aforament: 10000,
          chat: null,
          assistents: null,
        });
    });

    it('returns the list of events', async function () {
      const res = await request(app).get('/events');

      expect(res.statusCode).toBe(200);
      expect(res.body.events).toHaveLength(2);
    });
  });
});
