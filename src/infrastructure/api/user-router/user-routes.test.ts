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
    it('if the payload is correct it creates the user', async function () {
      const res = await request(app).post('/users/create').send({
        email: 'email@example.com',
        password: 'test-password',
        username: 'test-username',
        name: 'test-name',
        profilePicture: 'test-imageurl',
        phoneNumber: '000000000',
        usertype: 'usuario',
      });

      expect(res.statusCode).toBe(200);
    });

    it('if the payload is incorrect returns an error', async function () {
      const res = await request(app).post('/users/create').send({
        email: 'email@example.com',
        password: 'test-password',
        username: 'test-username',
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /users/username', function () {
    it ('if the payload is correct it returns the user with the given username', async function () {
      const res = await request(app).get('/users/username').query({
        username: 'test-username',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('User found');
      expect(res.body.user.username).toBe('test-username');
    });

    it('if the username does not exist it returns an error', async function () {
      const res = await request(app).get('/users/username').query({
        username: 'non-existent-username',
      });
  
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('User not found');
    });
  });

  describe('POST /users/login', function () {
    beforeEach(async function () {
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

    it('if the payload is correct and credentials too returns a token', async function () {
      const res = await request(app).post('/users/login').send({
        password: 'test-password',
        username: 'test-username',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeTruthy();
    });
  });

  describe('The requests that require authorization', function () {
    const authHeaders = {
      Authorization: '',
    };

    beforeEach(async function () {
      await request(app).post('/users/create').send({
        email: 'email@example.com',
        password: 'test-password',
        username: 'test-username',
        name: 'test-name',
        profilePicture: 'test-imageurl',
        phoneNumber: '000000000',
        usertype: 'usuario',
      });

      const res = await request(app).post('/users/login').send({
        password: 'test-password',
        username: 'test-username',
      });

      authHeaders.Authorization = `Bearer ${res.body.token}`;
    });

    describe('GET /users', function () {
      it('if we are not authorized it returns a 401', async function () {
        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(401);
      });

      it('if we are logged in it returns the list of users', async function () {
        const res = await request(app).get('/users').set(authHeaders);

        expect(res.statusCode).toBe(200);
      });
    });
  });
});
