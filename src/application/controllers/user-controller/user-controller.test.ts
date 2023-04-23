//import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
//import { UserModel } from '~/domain/entities/user';

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
  const createReq: Request = expressRequest;
  createReq.body = {
    email: 'email@example.com',
    password: 'test-password',
    username: 'test-username',
    name: 'test-name',
    profilePicture: 'test-imageurl',
    phoneNumber: '000000000',
    usertype: 'usuario',
  };
  const createRes = {} as unknown as Response;
  createRes.json = jest.fn();
  createRes.status = jest.fn(() => createRes);
  createRes.setHeader = jest.fn();

  beforeEach(async function () {
    await UserController.createUser(createReq, createRes);
  });

  it('Edits the atributes of an user', async function () {
    const editReq: Request = expressRequest;
    editReq.body = {
      password: 'test-password1',
      username: 'test-username',
      name: 'test-name1',
      email: 'email1@example.com',
      profilePicture: 'test-imageurl1',
      phoneNumber: '111111111',
    };
    const editRes = {} as unknown as Response;
    editRes.json = jest.fn();
    editRes.status = jest.fn(() => editRes);
    editRes.setHeader = jest.fn();

     await UserController.editUser(editReq, editRes);
  
    expect(editRes.status).toBeCalledWith(200);
    expect(editRes.json).toBeCalledWith({
      message:'Ususario editado correctamente',
      user:{
          __v: 0,
          email: 'email1@example.com',
          password: 'test-password1',
          username: 'test-username',
          name: 'test-name1',
          profilePicture: 'test-imageurl1',
          phoneNumber: '111111111',
          usertype: 'usuario',
        },
    });
  });

  it('Returns error when no username exists', async function () {
    const editReq: Request = expressRequest;
    editReq.body = {
      password: 'test-password1',
      username: 'non-existing-username',
      name: 'test-name1',
      email: 'email1@example.com',
    };
    const editRes = {} as unknown as Response;
    editRes.json = jest.fn();
    editRes.status = jest.fn(() => editRes);
    editRes.setHeader = jest.fn();

     await UserController.editUser(editReq, editRes);
  
    expect(editRes.status).toBeCalledWith(400);
    expect(editRes.json).toBeCalledWith({
      message:'El usuario indicado no existe',
    });
  });
});


describe('add follower user', function () { 
  const expressRequest: Request = {} as Request;
  const reqUser: Request = JSON.parse(JSON.stringify(expressRequest));
  reqUser.body = {
    email: 'email@example.com',
    password: 'test-password',
    username: 'test-username',
    name: 'test-name',
    profilePicture: 'test-imageurl',
    phoneNumber: '000000000',
    usertype: 'usuario',
  };
  const resUser = {} as unknown as Response;
  resUser.json = jest.fn();
  resUser.status = jest.fn(() => resUser);
  resUser.setHeader = jest.fn();

  const reqAddFoll: Request = JSON.parse(JSON.stringify(expressRequest));
    reqAddFoll.body = {
      username: 'test-username-followed', //usuaio al cual se le añade un nuevo follower
      follower: reqUser, //usuario el cual ha de ser añadido a la lista de followers
    };
    const resAddFoll = {} as unknown as Response;
    resAddFoll.json = jest.fn();
    resAddFoll.status = jest.fn(() => resAddFoll);
    resAddFoll.setHeader = jest.fn();
  
  
  beforeEach(async function () {
    await UserController.createUser(reqUser, resUser);
    await UserController.addFollower(reqAddFoll, resAddFoll);
  });

  it('returns the followers', function () {
    expect(resAddFoll.status).toBeCalledWith(200);
    expect(resAddFoll.json).toBeCalledWith(expect.objectContaining({
      message: 'Follower añadido correctamente',
    }));
  }); 
});


});

