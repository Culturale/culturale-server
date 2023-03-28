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

  describe('POST /users/create', function () {
    it('if the payload is correct it calls UserController.createUser', async function () {
      const res = await request(app).post('/users/create').send({
        email: 'email@example.com',
        password: 'test-password',
        username: 'test-user',
      });

      expect(res.statusCode).toBe(200);
    });

    it('if the payload is correct it calls UserController.createUser', async function () {
      const res = await request(app).get('/test-user');

      expect(res.statusCode).toBe(200);
    });
  });
});
