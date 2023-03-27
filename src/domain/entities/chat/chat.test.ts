import type { IMessage } from "~/domain/entities/message/message.interface";

import { Chat } from "./chat";
import type { IChat } from "./chat.interface";

describe("Chat Entity", function () {
  let instance: IChat;

  beforeEach(function () {
    const message: IMessage[] = [];
    instance = new Chat("test-id", message);
  });

  it("can be created", function () {
    expect(instance).toMatchSnapshot();
  });
});
