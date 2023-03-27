import { Event } from "./event";
import type { IEvent } from "./event.interface";

describe("Event Entity", function () {
  let instance: IEvent;

  const dateSpy = jest.spyOn(Date, "now").mockImplementation(() => 1234);

  beforeEach(function () {
    const time = Date.now();
    const date = new Date(time);

    instance = new Event(
      "test-id",
      20211006023,
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
    dateSpy.mockReset();
  });
});
