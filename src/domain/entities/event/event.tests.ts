import { Event } from "./event";
import type { IEvent } from "./event.interface";

describe("Event Entity", function () {
  let instance: IEvent;

  beforeEach(function () {
    instance = new Event("test-id", "test-denominacio", "test-descripcio");
  });

  it("can be created", function () {
    expect(instance).toMatchSnapshot();
  });
});
