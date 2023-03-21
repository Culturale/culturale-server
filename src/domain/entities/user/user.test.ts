import { User } from './user';
import type { IUser } from './user.interface';

describe('User Entity', function () {
  let instance: IUser;

  beforeEach(function () {
    instance = new User(
      'test-id',
      'test-email',
      'test-username',
      'test-password',
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
