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
          lat: 123.456,
          long: 789.012,
          price: '12 €',
          url: 'https://test-url.com',
          photo: 'test-photo.jpg',
          categoria: 'agenda:categories/festes',
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
          lat: 123.456,
          long: 789.012,
          price: '12 €',
          url: 'https://test-url.com',
          photo: 'test-photo.jpg',
          categoria: 'agenda:categories/festes',
        });
    });

    it('returns the list of events', async function () {
      const res = await request(app).get('/events');

      expect(res.statusCode).toBe(200);
      expect(res.body.events).toHaveLength(2);
    });
  });

  describe('POST /events/delete', function () {
    beforeEach(async function () {
      await request(app).post('/events/delete').send({
        id: 12348173049,
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
      const createRes = await request(app)
        .post('/events/create')
        .send({
          codi: 12348173049,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          lat: 123.456,
          long: 789.012,
          price: '12 €',
          url: 'https://test-url.com',
          photo: 'test-photo.jpg',
          categoria: 'agenda:categories/festes',
        });
      const eventId = await createRes.body.event._id;
      const res = await request(app)
        .post('/events/newMessage')
        .send({
          id: eventId,
          userId: 'user1',
          content: 'hola',
          date: new Date(2),
        });
      expect(res.body.message).toBe('chat sent it');
      expect(res.statusCode).toBe(200);
    });

    it('if the payload is incorrect returns an error', async function () {
      const res = await request(app)
        .post('/events/newMessage')
        .send({
          id: 12348173049,
          content: 'hola',
          date: new Date(2),
        });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /events/edit', function () {
    it('if the payload is correct it modifies the event', async function () {
      const createRes = await request(app)
        .post('/events/create')
        .send({
          codi: 12348173049,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          lat: 123.456,
          long: 789.012,
          price: '12 €',
          url: 'https://test-url.com',
          photo: 'test-photo.jpg',
          categoria: 'agenda:categories/festes',
        });
      const eventId = await createRes.body.event._id;
      const res = await request(app).post('/events/edit').send({
        id: eventId,
        denominacio: 'new-test-event',
        descripcio: 'new-test-description',
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Evento editado correctamente');
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
          lat: 123.456,
          long: 789.012,
          price: '12 €',
          url: 'https://test-url.com',
          photo: 'test-photo.jpg',
          categoria: 'agenda:categories/festes',
        });

      const res = await request(app).post('/events/edit').send({
        codi: 123456789,
        denominacio: '',
      });

      expect(res.body.errors).toBeTruthy();
    });
  });



  describe('GET /events/messages', function () {
    it('returns the list of messages', async function () {
      const createRes = await request(app)
        .post('/events/create')
        .send({
          codi: 12348173049,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          lat: 123.456,
          long: 789.012,
          price: '12 €',
          url: 'https://test-url.com',
          photo: 'test-photo.jpg',
          categoria: 'agenda:categories/festes',
        });
      const eventId = await createRes.body.event._id;
      await request(app)
        .post('/events/newMessage')
        .send({
          id: eventId,
          userId: 'user1',
          content: 'hola',
          date: new Date(2),
        });
      const res = await request(app).get(`/events/${eventId}/messages`);
      expect(res.statusCode).toBe(200);
      expect(res.body.messages).toHaveLength(1);
    });
  });

  describe('POST /events/newParticipant', function () {
    let eventId: string;
    beforeEach(async function () {
      const createRes = await request(app)
        .post('/events/create')
        .send({
          codi: 12348173049,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          lat: 123.456,
          long: 789.012,
          price: '12 €',
          url: 'https://test-url.com',
          photo: 'test-photo.jpg',
          categoria: 'agenda:categories/festes',
        });
      eventId = await createRes.body.event._id;
      await request(app).post('/users/create').send({
        email: 'email@example.com',
        password: 'test-password',
        username: 'test-username',
        name: 'test-name',
        profilePicture: 'test-imageurl',
        phoneNumber: '000000000',
        usertype: 'usuario',
      });
    });

    it('if the payload is correct it adds the participant', async function () {
      const res = await request(app).post('/events/newParticipant').send({
        id: eventId,
        username: 'test-username',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Participante añadido correctamente');
    });

    it('if the payload is incorrect it sends the error', async function () {
      const res = await request(app).post('/events/newParticipant').send({
        id: '645ac0f30679a1fcb116d440',
        username: 'test-username',
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('user or event not found');
    });
  });

  describe('DELETE /events/deleteParticipant', function () {
    let eventId: string;
    beforeEach(async function () {
      const createRes = await request(app)
        .post('/events/create')
        .send({
          codi: 12348173049,
          denominacio: 'test-event',
          descripcio: 'test-description',
          dataIni: new Date(1),
          dataFi: new Date(2),
          horari: '2h',
          adress: 'Passeig de Gràcia',
          lat: 123.456,
          long: 789.012,
          price: '12 €',
          url: 'https://test-url.com',
          photo: 'test-photo.jpg',
          categoria: 'agenda:categories/festes',
        });
      eventId = await createRes.body.event._id;
      await request(app).post('/users/create').send({
        email: 'email@example.com',
        password: 'test-password',
        username: 'test-username',
        name: 'test-name',
        profilePicture: 'test-imageurl',
        phoneNumber: '000000000',
        usertype: 'usuario',
      });
    });

    it('if the payload is correct it deletes the participant', async function () {
      // primero agregamos el participante al evento
      await request(app).post('/events/newParticipant').send({
        id: eventId,
        username: 'test-username',
      });

      // luego eliminamos el participante del evento
      const deleteParticipantRes = await request(app)
        .delete('/events/deleteParticipant')
        .send({
          id: eventId,
          username: 'test-username',
        });
      expect(deleteParticipantRes.statusCode).toBe(200);
      expect(deleteParticipantRes.body.message).toBe(
        'Participante eliminado correctamente',
      );
    });

    it('if the payload is incorrect it sends the error', async function () {
      const res = await request(app).delete('/events/deleteParticipant').send({
        id: '6453e1acd9fd34011413c89b',
        username: 'test-username1',
      });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('user or event not found');
    });
  });
});
