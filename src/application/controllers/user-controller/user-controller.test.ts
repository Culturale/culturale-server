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
      message:'Usuario editado correctamente',
      user:{
          email: 'email1@example.com',
          password: 'test-password1',
          username: 'test-username',
          name: 'test-name1',
          profilePicture: 'test-imageurl1',
          phoneNumber: '111111111',
          usertype: 'usuario',
          followers: [],
          followeds:[],
          id: undefined,
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
  
    expect(editRes.status).toBeCalledWith(404);
    expect(editRes.json).toBeCalledWith({
      message:'El usuario indicado no existe',
    });
  });
});

describe('deleteUser', function () {
  const req1: Request = expressRequest;
  req1.params = {id: '0'};

  const res1 = {} as unknown as Response;
  res1.json = jest.fn();
  res1.status = jest.fn(() => res1);
  res1.setHeader = jest.fn();

  // Esta parte depende del funcionamiento de "createUser"
  const userUsername: string = 'test-username';
  const req2: Request = expressRequest;
  req2.body = {
    email: 'email@example.com',
    password: 'test-password',
    username: userUsername,
    name: 'test-name',
    profilePicture: 'test-imageurl',
    phoneNumber: '000000000',
    usertype: 'usuario',
  };

  const res2 = {} as unknown as Response;
  res2.json = jest.fn();
  res2.status = jest.fn(() => res2);
  res2.setHeader = jest.fn();

  const req3: Request = expressRequest;
  const res3 = {} as unknown as Response;
  res3.json = jest.fn();
  res3.status = jest.fn(() => res3);
  res3.setHeader = jest.fn();

  const req4: Request = expressRequest;
  const res4 = {} as unknown as Response;
  res4.json = jest.fn();
  res4.status = jest.fn(() => res4);
  res4.setHeader = jest.fn();




  beforeAll(async function () {
    // Prerequisito primer test
    await UserController.deleteUser(req1, res1);

    // Prerequisito segundo test
    // Creamos el usuario que posteriormente será eliminado
    await UserController.createUser(req2, res2);

    // Buscamos al usuario que será eliminado
    await UserController.getAllUsers(req3, res3);
    const obj = (res3.json as jest.Mock).mock.calls[(res3.json as jest.Mock).mock.calls.length - 1][0];
    const userId: string = obj.users[0]._id;
    //console.log('ID: ' + userId);

    // Eliminamos el usuario que acabamos de crear
    req4.params = {id: userId};
    await UserController.deleteUser(req4, res4);

  });

  it('Dont exist user', function () {
    expect(res1.status).toBeCalledWith(500);
    expect(res1.json).toBeCalledWith({
      error: 'Cannot find user with that id'
    });
  });

  it('User deleted correctly', function () {
    expect(res4.status).toBeCalledWith(200);
    expect(res4.json).toBeCalledWith({
      message: 'User deleted',
      username: userUsername
    });
  });

});


describe('getUserForUsername', function () {
  const req: Request = expressRequest;
  const res = {} as unknown as Response;
  res.json = jest.fn();
  res.status = jest.fn(() => res);
  res.setHeader = jest.fn();

  beforeEach(async function () {
    await UserController.getUserForUsername(req, res);
  });

  it('returns 404 when username does not exists', function () {
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      message: 'Usuario no encontrado'
    });
  });
});



describe('add follower user', function () { 
  const expressRequest: Request = {} as Request;
  const reqUser: Request = JSON.parse(JSON.stringify(expressRequest));
  reqUser.body = { //usaurio añadido en la lista
    email: 'email@example.com',
    password: 'test-password',
    username: 'test-username-follower',
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
      username: 'test-username', //usuaio al cual se le añade un nuevo follower
      follower: 'test-username-follower', //nuevo segidor añadido a ls lista
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
      message: 'Follower i followed añadido correctamente',
    }));
  }); 
});


});

