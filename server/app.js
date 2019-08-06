import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import UserController from './src/controllers/user.controller';
import TripController from './src/controllers/trip.controller';
import { verifyToken, verifyAdmin } from './src/middleware/middlewares';
// set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
const baseUrl = '/api/v1/';

app.post(`${baseUrl}auth/signup`, UserController.signUpUser);
app.post(`${baseUrl}auth/signin`, UserController.logInUser);
app.get(`${baseUrl}trips`, verifyToken, TripController.getTrips);
app.post(`${baseUrl}trip`, verifyToken, verifyAdmin, TripController.createTrip);
app.patch(`${baseUrl}trips/:id/cancel`, verifyToken, verifyAdmin, TripController.cancelTrip);
app.get(`${baseUrl}trips/:id`, verifyToken, TripController.getTrip);

export default app;
