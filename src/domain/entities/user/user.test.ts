import { User } from "./user";
import type { IUser } from "./user.interface";

describe("User Entity", function () {
  let instance: IUser;

  beforeEach(function () {
    instance = new User("test-username", "test-name","test-password","test-email","test-profilePicture","test-phone", "test-type");
  });

  it("can be created", function () {
    //expect(instance).toMatchSnapshot();
      it("can be created", function () {
          expect(instance).toEqual({
              username: "test-username",
              name: "test-name",
              password: "test-password",
              email: "test-email",
              profilePicture: "test-profilePicture",
              phoneNumber: "test-phone",
              usertype: "test-type"
          });
      });
  });
});
