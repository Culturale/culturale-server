import type { CreateUserDto } from '~/infrastructure';

import { User } from './user';
import type { IUser } from './user.interface';

describe('User Entity', function () {
  let instance: IUser;


  beforeEach(function () {
    const userProps: CreateUserDto  = {username: 'test-username', name: 'test-name' , password: 'test-password', email: 'test-email', profilePicture:'test-profilePicture', phoneNumber: 'test-phone', usertype: 'test-type', report: 0};
    instance = new User(
      userProps,
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
