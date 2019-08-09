import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import auth from './src/routes/auth';
import trip from './src/routes/trip';
import booking from './src/routes/booking';

// set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
const baseUrl = '/api/v1';

app.use(`${baseUrl}/auth`, auth);
app.use(baseUrl, trip);
app.use(baseUrl, booking);
// / HANDLE SOME ERRORS ///

// 404
app.use((req, res) => res.status(404).send({
  status: 404,
  message: `Oh! I am sorry the Route ${req.url} couldn't be found in this Andela server. Contact Emmanuel or Eric`,
}));

// 500 or any
app.use((err, req, res) => res.status(500).send({
  status: 500,
  message: `Your request returned with a server error ${err}`,
}));

export default app;
