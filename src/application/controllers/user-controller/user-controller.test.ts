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
      // Establecer los parámetros de búsqueda según los filtros que deseas probar
      req.query = {
        username: 'test-username',
        name: 'test-name',
        phoneNumber: '000000000',
      };
  
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
          report: 0,
        }),
      });
    });

    const createTestUser = async (req: Request): Promise<string> => {
      const res = {} as unknown as Response;
      let userId: string;
    
      res.json = jest.fn().mockImplementation((data: any) => {
        userId = data.user.id;
      });
      res.status = jest.fn().mockReturnValue(res);
      res.setHeader = jest.fn();
    
      await UserController.createUser(req, res);
      return userId;
    };

    describe('report user', function () {
     
      let userId: string;
    
      const expressRequest: Request = {} as Request;
      const resMessage = {} as unknown as Response;
      resMessage.json = jest.fn();
      resMessage.status = jest.fn(() => resMessage);
      resMessage.setHeader = jest.fn();
    
      beforeEach(async function () {
        const reqUser: Request = expressRequest;
        reqUser.body = {
          username: 'userToReport',
          name: 'Test User',
          password: '1234',
          email: 'test@test.com',
          profilePicture: 'test.png',
          phoneNumber: '123456789',
          usertype: 'usuario',
        };
    
        userId = await createTestUser(reqUser);
      });
    
      it('reports the user', async function () {
        const req : Request = JSON.parse(JSON.stringify(expressRequest));
        req.body = { username: 'userToReport' };
        const res = {} as unknown as Response;
        res.json = jest.fn();
        res.status = jest.fn(() => res);
        res.setHeader = jest.fn();
    
        await UserController.ReportUser(req, res);
    
      
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
          message: 'User reported',
        });
      });

      it('deletes the user', async function () {
        const req : Request = JSON.parse(JSON.stringify(expressRequest));
        req.body = { id: userId };
        const res = {} as unknown as Response;
        res.json = jest.fn();
        res.status = jest.fn(() => res);
        res.setHeader = jest.fn();
    
        await UserController.deleteUser(req, res);
    
      
        expect(res.status).toBeCalledWith(200);
      });
      it('gets reported users', async function () {
        const req: Request = JSON.parse(JSON.stringify(expressRequest));
        const res = {} as unknown as Response;
        res.json = jest.fn();
        res.status = jest.fn(() => res);
        res.setHeader = jest.fn();
    
        await UserController.getReportedUsers(req, res);
        expect(res.status).toBeCalledWith(200);
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
          email: 'email1@example.com',
          password: 'test-password1',
          username: 'test-username',
          name: 'test-name1',
          profilePicture: 'test-imageurl1',
          phoneNumber: '111111111',
          usertype: 'usuario',
          followers: [],
          preferits: [],
          followeds: [],
          reviews: [],
          eventSub: [],
          contacts: [],
          report: 0,
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
      username: 'user2', //usuaio al cual se le añade un nuevo follower
      follower: 'user1', //nuevo segidor añadido a ls lista
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
