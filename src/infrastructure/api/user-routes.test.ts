import mongoose from "mongoose";
import request from "supertest";

import app from "~/server";

describe("User Routes", function () {
  // afterEach(async () => {
  //   await mongoose.connection.close();
  // });

  describe("POST /users/create", function () {
    it("if the payload is correct it calls UserController.createUser", async function () {
      request(app)
        .post("/users/create")
        .send({
          email: "email@example.com",
          password: "test-password",
          username: "test-user",
        })
        .set("Accept", "application/json")
        .end();
      await mongoose.connection.close();
    });
  });
});
