import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { UserController } from './user-controller';

dotenv.config();

describe('Delete User', function () {
  beforeAll(async function () {
    const mongod = await MongoMemoryServer.create();
    const dbUrl = mongod.getUri();
    await mongoose.connect(dbUrl);
  });

  afterAll(async function () {
    await mongoose.connection.close();
  });


  const userUsername = 'test-eliminarUsuari';

  it('Dont exist user', async function () {
    const req: Request = expressRequest;
    req.params = {id: '0'};

    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();
    await UserController.deleteUser(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({
      error: 'Cannot find user with that id'
    });
  });

  it('User deleted correctly', async function () {
    // Creamos el usuario que posteriormente será eliminado
    const req2: Request = expressRequest;
    req2.body = {
      email: 'email@exampleEliminaUser.com',
      password: 'test-elimina-user-password',
      username: userUsername,
      name: 'test-elimina-user-name',
      profilePicture: 'test-elimina-user-imageurl',
      phoneNumber: '999999999',
      usertype: 'usuario',
    };
  
    const res2 = {} as unknown as Response;
    res2.json = jest.fn();
    res2.status = jest.fn(() => res2);
    res2.setHeader = jest.fn();
    await UserController.createUser(req2, res2);

    // Buscamos al usuario que será eliminado
    const req3: Request = expressRequest;
    const res3 = {} as unknown as Response;
    res3.json = jest.fn();
    res3.status = jest.fn(() => res3);
    res3.setHeader = jest.fn();

    req3.params = {id: userUsername};
    await UserController.getUserForUsername(req3, res3);
    const obj = (res3.json as jest.Mock).mock.calls[(res3.json as jest.Mock).mock.calls.length - 1][0];
    const userId: string = obj.user.id;

    // Eliminamos el usuario que acabamos de crear
    const req4: Request = expressRequest;
    const res4 = {} as unknown as Response;
    res4.json = jest.fn();
    res4.status = jest.fn(() => res4);
    res4.setHeader = jest.fn();

    req4.params = {id: userId};
    await UserController.deleteUser(req4, res4);

    // Volvemos a eleminar el usuario para verificar que no existe:
    const req5: Request = expressRequest;
    const res5 = {} as unknown as Response;
    res5.json = jest.fn();
    res5.status = jest.fn(() => res5);
    res5.setHeader = jest.fn();

    req5.params = {id: userId};
    await UserController.deleteUser(req5, res5);

    
    expect(res4.status).toBeCalledWith(200);
    expect(res4.json).toBeCalledWith({
      message: 'User deleted',
      username: userUsername
    });

    expect(res5.status).toBeCalledWith(500);
    expect(res5.json).toBeCalledWith({
      error: 'Cannot find user with that id'
    });
  });
});
