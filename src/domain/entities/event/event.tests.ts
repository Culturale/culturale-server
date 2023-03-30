import { Event } from './event';
import type { IEvent } from './event.interface';

describe('Event Entity', function () {
  let instance: IEvent;

  beforeEach(function () {
    const date: Date = new Date();
    instance = new Event(
      'test-id',
      'test-denominacio',
      'test-descripcio',
      date,
      date,
      'test-horari',
      'test-adress',
      'test-url',
      41.3850639,
      2.2471186,
      'test-categoria',
      123456789,
      999999,
      999999,
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
