import { Types } from 'mongoose';

import { User } from './user';
import type { IUser } from './user.interface';

describe('User Entity', function () {
  let instance: IUser;

  beforeEach(function () {
    instance = new User(
      new Types.ObjectId('642412cfb50197eba72cac1d'),
      'test-email',
      'test-username',
      'test-password'
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
