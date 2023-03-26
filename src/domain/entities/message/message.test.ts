import { Message } from "./message";
import type { IMessage } from "./message.interface";

describe("Message Entity", function () {
  let instance: IMessage;

  beforeEach(function () {
    const date: Date = new Date();
    instance = new Message("test-id", "test-content", "test-userId", date);
  });

  it("can be created", function () {
    expect(instance).toMatchSnapshot();
  });
});
