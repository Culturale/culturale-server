//import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { request as expressRequest } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { UserRepository } from '~/domain/repositories/user-repository/user-repository';

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

  // Despues de cada test, supuestamente se limpian todos los mocks de jest
  afterEach(() => {
    jest.clearAllMocks();
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
        message: 'Usuario editado correctamente',
        user: expect.objectContaining({
          email: 'email1@example.com',
          password: 'test-password1',
          username: 'test-username',
          name: 'test-name1',
          profilePicture: 'test-imageurl1',
          phoneNumber: '111111111',
          usertype: 'usuario',
          followers: [],
          reviews: [],
          followeds: [],
          eventSub: [],
        }),
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
        message: 'El usuario indicado no existe',
      });
    });
  });

  describe('deleteUser', function () {
    // Despues de los tests de eliminar usuario supuestamente elimino la base de datos
    afterAll(async function() {
      const collections = await mongoose.connection.db.collections();
      for (const collection of collections) {
        await collection.deleteMany({});
      }
    });
  
    // Esta parte depende del funcionamiento de "createUser"
    const userUsername = 'test-eliminarUsuari';
    /*const req2: Request = expressRequest;
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
    res2.setHeader = jest.fn();*/
  
    /*const req3: Request = expressRequest;
    const res3 = {} as unknown as Response;
    res3.json = jest.fn();
    res3.status = jest.fn(() => res3);
    res3.setHeader = jest.fn();*/
  
    /*const req4: Request = expressRequest;
    const res4 = {} as unknown as Response;
    res4.json = jest.fn();
    res4.status = jest.fn(() => res4);
    res4.setHeader = jest.fn();*/
  
  
  
  
    /*beforeAll(async function () {
      // Prerequisito primer test
      await UserController.deleteUser(req1, res1);
  
      // Prerequisito segundo test
      // Creamos el usuario que posteriormente será eliminado
      await UserController.createUser(req2, res2);
  
      // Buscamos al usuario que será eliminado
      req3.params = {id: userUsername};
      await UserController.getUserForUsername(req3, res3);
      const obj = (res3.json as jest.Mock).mock.calls[(res3.json as jest.Mock).mock.calls.length - 1][0];
      const userId: string = obj.user.id;
      //console.log('ID: ' + userId);
  
      // Eliminamos el usuario que acabamos de crear
      req4.params = {id: userId};
      await UserController.deleteUser(req4, res4);
  
    });*/
  
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

  describe('getUserForUsername', function () {
    const expressRequest: Request = {} as Request;

    const req: Request = expressRequest;
    req.params = { id: 'test-username' };
    const res = {} as unknown as Response;
    res.json = jest.fn();
    res.status = jest.fn(() => res);
    res.setHeader = jest.fn();
    const badReq: Request = JSON.parse(JSON.stringify(expressRequest));
    badReq.params = { id: 'non-existing-username' };
    const badRes = {} as unknown as Response;
    badRes.json = jest.fn();
    badRes.status = jest.fn(() => badRes);
    badRes.setHeader = jest.fn();

    beforeEach(async function () {
      await UserController.getUserForUsername(req, res);
      await UserController.getUserForUsername(badReq, badRes);
    });

    it('returns the info user when it does exists', function () {
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        message: 'Usuario encontrado',
        user: expect.objectContaining({
          email: 'email@example.com',
          password: 'test-password',
          username: 'test-username',
          name: 'test-name',
          profilePicture: 'test-imageurl',
          phoneNumber: '000000000',
          usertype: 'usuario',
          followers: [],
          followeds: [],
          reviews: [],
          eventSub: [],
        }),
      });
    });

    it('returns 404 when username does not exists', function () {
      expect(badRes.status).toBeCalledWith(404);
      expect(badRes.json).toBeCalledWith({
        message: 'Usuario no encontrado',
      });
    });
  });

  describe('add follower user', function () {
    const expressRequest: Request = {} as Request;
    const reqUser: Request = JSON.parse(JSON.stringify(expressRequest));
    reqUser.body = {
      //usaurio añadido en la lista
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
      expect(resAddFoll.json).toBeCalledWith(
        expect.objectContaining({
          message: 'Follower i followed añadido correctamente',
        }),
      );
    });
  });

  describe('Unfollow user', function () {
    // Crear usuario 1 que sigue a usuario 2
    const expressRequest: Request = {} as Request;
    const reqUser: Request = JSON.parse(JSON.stringify(expressRequest));
    reqUser.body = {
      //usaurio añadido en la lista
      name: 'User1',
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
      phoneNumber: '123456789',
      profilePicture: 'https://example.com/user1.jpg',
      usertype: 'usuario',
    };
    const expressRequest2: Request = {} as Request;
    const reqUser2: Request = JSON.parse(JSON.stringify(expressRequest2));
    reqUser2.body = {
      //usaurio añadido en la lista
      name: 'User2',
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
      phoneNumber: '987654321',
      profilePicture: 'https://example.com/user2.jpg',
      usertype: 'usuario',
    };

    const resUser2 = {} as unknown as Response;
    resUser2.json = jest.fn();
    resUser2.status = jest.fn(() => resUser2);
    resUser2.setHeader = jest.fn();

    const resUser = {} as unknown as Response;
    resUser.json = jest.fn();
    resUser.status = jest.fn(() => resUser);
    resUser.setHeader = jest.fn();

    const reqAddFoll: Request = JSON.parse(JSON.stringify(expressRequest));
    reqAddFoll.body = {
      username: 'user1', //usuaio al cual se le añade un nuevo follower
      follower: 'user2', //nuevo segidor añadido a ls lista
    };
    const resAddFoll = {} as unknown as Response;
    resAddFoll.json = jest.fn();
    resAddFoll.status = jest.fn(() => resAddFoll);
    resAddFoll.setHeader = jest.fn();

    beforeEach(async function () {
      await UserController.createUser(reqUser, resUser);
      await UserController.createUser(reqUser2, resUser2);
      await UserController.addFollower(reqAddFoll, resAddFoll);
    });

    it('should unfollow user2', async function () {
      // Llamar a Unfollow con los parámetros correspondientes
      const req: Request = {
        body: { username: 'user2', follower: 'user1' },
      } as Request;
      const res: Response = {} as Response;
      res.json = jest.fn();
      res.status = jest.fn(() => res);

      await UserController.Unfollow(req, res);

      // Comprobar que user1 ya no sigue a user2
      const updatedUser1 = await UserRepository.findByUsername('user1');
      expect(updatedUser1.followeds).toHaveLength(0);

      // Comprobar que user2 ya no es seguido por user1
      const updatedUser2 = await UserRepository.findByUsername('user2');
      if (updatedUser2) {
        expect(updatedUser2.followers).toHaveLength(0);
      } else {
        throw new Error('User not found');
      }

      // Comprobar la respuesta de la función
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Follower y followed eliminados correctamente',
          followers: [],
        }),
      );
    });
  });
});
