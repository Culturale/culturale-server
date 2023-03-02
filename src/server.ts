import express from 'express';
import { routes } from './routes';
const app = express();

//middleware
app.use(express.json());

app.use('/', routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

module.exports = app;
