import express from 'express';
import data from './db/data';

// set up the express app
const app = express();

const baseUrl = '/api/v1/';

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
