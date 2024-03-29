/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';

import { routes } from '~/infrastructure';
dotenv.config();

const app = express();
const cors = require('cors');

//middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/', routes);



const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

async function connectToMongo() {
  // @ts-ignore
  if (!global.__TEST__) {
    const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
    console.log('Connecting to database...');
    connect(MONGO_URI).then(() =>
      console.log('Connected to database: ', DB_NAME),
    );
  }
}

connectToMongo();

// @ts-ignore
if (!global.__TEST__) {
  const PORT = process.env.NODE_LOCAL_PORT;
  app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
  });
}

export { app };
