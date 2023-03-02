import express from 'express';
import { connect } from 'mongoose';
import { routes } from './infrastructure';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

//middleware
app.use(express.json());

app.use('/', routes);

async function connectToMongo() {
  console.log('Connecting to database...');
  await connect('mongodb://test');
  console.log('Connected to Database');
}

connectToMongo();

const PORT = process.env.NODE_PORT;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

module.exports = app;
