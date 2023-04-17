import { User } from './user';
import type { IUser } from './user.interface';

describe('User Entity', function () {
  let instance: IUser;

  const user1: IUser = { 
    username: 'user1', 
    name: 'User One', 
    password: 'password1', 
    email: 'user1@example.com', 
    profilePicture: 'picture1.png', 
    phoneNumber: '123456789', 
    usertype: 'regular',
    followers: []
  };

  const user2: IUser = { 
    username: 'user2', 
    name: 'User Two', 
    password: 'password2', 
    email: 'user2@example.com', 
    profilePicture: 'picture2.png', 
    phoneNumber: '123456789', 
    usertype: 'regular',
    followers: []
  };

  beforeEach(function () {
    instance = new User('test-username', 'test-name','test-password','test-email','test-profilePicture','test-phone','test-type', [user1, user2]);

  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
