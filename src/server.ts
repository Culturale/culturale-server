/* eslint-disable no-console */
import * as dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";

import { routes } from "~/infrastructure";
dotenv.config();

const app = express();

//middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/", routes);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

async function connectToMongo() {
  const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
  console.log("Connecting to database...");
  connect(MONGO_URI).then(() =>
    console.log("Connected to database: ", DB_NAME),
  );
}

connectToMongo();

const PORT = process.env.NODE_LOCAL_PORT;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

module.exports = app;
