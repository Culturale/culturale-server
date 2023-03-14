import express from 'express';
import { connect } from 'mongoose';
import { routes } from '~/infrastructure';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

//middleware
app.use(express.json());

app.use('/', routes);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

async function connectToMongo() {
  const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
  console.log('Connecting to database...');
  console.log('MONGO URI: ', MONGO_URI);
  connect(MONGO_URI).then(() => console.log('Connected to Database'));
}

connectToMongo();

const PORT = process.env.NODE_LOCAL_PORT;

app.listen(PORT, () => {
  console.log('TEST');
  console.log('Server is running on port', PORT);
});

module.exports = app;
