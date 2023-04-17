import { Types } from 'mongoose';

import { Message } from './message';
import type { IMessage } from './message.interface';

describe('Chat Entity', function () {
  let instance: IMessage;

  beforeEach(function () {
    instance = new Message(
      new Types.ObjectId('6423f909d626b03e800a9858'),
      'test-content',
      'test-userId',
      new Date(2),
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
