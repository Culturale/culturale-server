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

  describe('POST /events/edit', function () {
    it('if the payload is correct it modifies the event', async function () {
      // Primero, debes crear un evento existente que puedas modificar
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
  
      // Luego, envías una solicitud POST a la ruta /events/edit para modificar el evento
      const res = await request(app)
        .post('/events/edit')
        .send({
          codi: 12348173049,
          denominacio: 'new-test-event',
          descripcio: 'new-test-description',
        });

  
      // Verifica que la respuesta de la solicitud sea la esperada y que el evento se haya modificado correctamente
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Evento editado correctamente');
  
      //const updatedEvent = await Event.to(12348173049);
  
      //expect(res.supdatedEvent.denominacio).toBe('new-test-event');
      //expect(res.updatedEvent.descripcio).toBe('new-test-description');
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
  
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  


});
