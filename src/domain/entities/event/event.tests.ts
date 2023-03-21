import { Event } from "./event";
import type { IEvent } from "./event.interface";

describe("Event Entity", function () {
  let instance: IEvent;

  beforeEach(function () {
    const date: Date = new Date();
    instance = new Event(
      "test-id",
      "test-denominacio",
      "test-descripcio",
      date,
      date,
      "test-horari",
      "test-adress",
      "test-url"
    );
  });

  it("can be created", function () {
    expect(instance).toMatchSnapshot();
  });
});
