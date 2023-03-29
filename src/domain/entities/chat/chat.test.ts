import { Types } from 'mongoose';

import type { IMessage } from '~/domain/entities/message/message.interface';

import { Chat } from './chat';
import type { IChat } from './chat.interface';

describe('Chat Entity', function () {
  let instance: IChat;

  beforeEach(function () {
    const message: IMessage[] = [];
    instance = new Chat(
      new Types.ObjectId('6423f909d626b03e800a9858'),
      message
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
