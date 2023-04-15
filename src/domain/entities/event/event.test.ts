// import { Types } from 'mongoose';

// import type { IChat } from '~/domain/entities/chat/chat.interface';
import type { CreateEventDto } from '~/infrastructure';

import { Event } from './event';
import type { IEvent } from './event.interface';


describe('Event Entity', function () {
  let instance: IEvent;

  const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1234);

  beforeEach(function () {
    const time = Date.now();
    const date = new Date(time);
    const eventProps: CreateEventDto  = {codi: 20211006023, denominacio: 'test-denominacio' , descripcio: 'test-descripcio', dataIni: date, dataFi: date, horari: '2h', adress: 'test-adress', url: 'test-adress'};
    instance = new Event(
      eventProps,
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
    dateSpy.mockReset();
  });
});
