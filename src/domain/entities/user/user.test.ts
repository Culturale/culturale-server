import { User } from './user';
import type { IUser } from './user.interface';

describe('User Entity', function () {
  let instance: IUser;


  beforeEach(function () {
    instance = new User('test-username', 'test-name','test-password','test-email','test-profilePicture','test-phone','test-type');

  });
  /*
  beforeEach(function () {
    const eventProps: CreateEventDto  = {codi: 20211006023, denominacio: 'test-denominacio' , descripcio: 'test-descripcio', dataIni: date, dataFi: date, horari: '2h', adress: 'test-adress', url: 'test-adress'};
    instance = new Event(
      eventProps,
    );
  });
  */

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
