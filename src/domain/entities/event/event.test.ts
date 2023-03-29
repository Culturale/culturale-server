import type { IChat } from '~/domain/entities/chat/chat.interface';

import { Event } from './event';
import type { IEvent } from './event.interface';

describe('Event Entity', function () {
  let instance: IEvent;

  const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1234);

  beforeEach(function () {
    const time = Date.now();
    const date = new Date(time);
    const chat: IChat = null;
    instance = new Event(
      'test-id',
      20211006023,
      'test-denominacio',
      'test-descripcio',
      date,
      date,
      'test-horari',
      'test-adress',
      'test-url',
      chat
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
    dateSpy.mockReset();
  });
});
