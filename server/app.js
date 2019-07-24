import express from 'express';
import bodyParser from 'body-parser';
import UserController from './src/controllers/user.controller';

// set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const baseUrl = '/api/v1/';

app.post(`${baseUrl}auth/signup`, UserController.signUpUser);
app.post(`${baseUrl}auth/signin`, UserController.logInUser);

export default app;
