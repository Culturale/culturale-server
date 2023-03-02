import express from 'express';
const app = express();

//middleware
app.use(express.json());

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

module.exports = app;
