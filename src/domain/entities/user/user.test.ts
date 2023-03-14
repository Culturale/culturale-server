import { User } from './user';
import { IUser } from './user.interface';

describe('User Entity', function () {
  let instance: IUser;

  beforeEach(function () {
    instance = new User('test-id', 'test-email', 'test-username');
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
