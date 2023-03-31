import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { UserController } from './user-controller';

dotenv.config();

describe('User Controller', function () {
  beforeAll(async function () {
    const mongod = await MongoMemoryServer.create();
    const dbUrl = mongod.getUri();
    await mongoose.connect(dbUrl);
  });

  afterAll(async function () {
    await mongoose.connection.close();
  });

  describe('createUser', function () {
    const req: Request = expressRequest;
    req.body = {
      email: 'email@example.com',
      password: 'test-password',
      username: 'test-username',
      name: 'test-name',
      profilePicture: 'test-imageurl',
      phoneNumber: '000000000',
      usertype: 'usuario',
    };
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    beforeEach(async function () {
      await UserController.createUser(req, res);
    });

    it('returns the correct payload', function () {
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        message: 'user created',
        user: expect.objectContaining({
          email: 'email@example.com',
          password: 'test-password',
          username: 'test-username',
          name: 'test-name',
          profilePicture: 'test-imageurl',
          phoneNumber: '000000000',
          usertype: 'usuario',
        }),
      });
    });
  });

  describe('getAllUsers', function () {
    const req: Request = expressRequest;
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    beforeEach(async function () {
      await UserController.getAllUsers(req, res);
    });

    it('returns all users', function () {
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        users: [
          expect.objectContaining({
            email: 'email@example.com',
            password: 'test-password',
            username: 'test-username',
            name: 'test-name',
            profilePicture: 'test-imageurl',
            phoneNumber: '000000000',
            usertype: 'usuario',
          }),
        ],
      });
    });
  });















  describe('EditPerfil', function () {
    const req: Request = expressRequest;
    req.body = {
      password: 'test-password1',
      username: 'test-username',
      name: 'test-name1',
      email: 'email1@example.com',
    };
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();

    const req2: Request = expressRequest;
    req2.body = {
      email: 'email@example.com',
      password: 'test-password',
      username: 'test-username',
      name: 'test-name',
      profilePicture: 'test-imageurl',
      phoneNumber: '000000000',
      usertype: 'usuario',
    };
    const res2 = {} as unknown as Response;
    res2.json = jest.fn();
    res2.status = jest.fn(() => res);
    res2.setHeader = jest.fn();

    beforeEach(async function () {
      await UserController.createUser(req2, res2);
      await UserController.editUser(req, res);
    });

    it('Edits the atributes of an user', function () {
     
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        message:'Ususario editado correctamente',
        users: [
          expect.objectContaining({
            __v: 0,
            email: 'email1@example.com',
            password: 'test-password1',
            username: 'test-username',
            name: 'test-name1',
            profilePicture: 'test-imageurl',
            phoneNumber: '000000000',
            usertype: 'usuario',
          }),
        ],
      });
    });
  });
});
