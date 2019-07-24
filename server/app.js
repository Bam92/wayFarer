import express from 'express';
import bodyParser from 'body-parser';
import data from './db/data';

// set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const baseUrl = '/api/v1/';

/**
 * Register a user
 * @param {object} req
 * @param {object} res
 */
app.post(`${baseUrl}auth/signup`, (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      success: false,
      message: 'email is required',
    });
  }

  const email = /.+@.+\..+/;
  if (!email.test(req.body.email)) {
    return res.status(400).send({
      success: false,
      message: 'email is invalid',
    });
  }

  if (req.body.email === data.email) {
    console.log(data.email)
    return res.status(409).send({
      success: false,
      message: 'email exists already',

    });
  }

  if (!req.body.first_name || !req.body.last_name) {
    return res.status(400).send({
      success: false,
      message: 'first name or last name is required',
    });
  }

  const letters = /^[0-9a-zA-Z]+$/; // names must only contain alphanumeric char
  if (!letters.test(req.body.first_name) || !letters.test(req.body.last_name)) {
    return res.status(400).send({
      success: false,
      message: 'first name or last name contains invalid charactor(s)',
    });
  }

  if (req.body.first_name.length < 2 || req.body.last_name.length < 2) {
    return res.status(400).send({
      success: false,
      message: 'first name or last name must contain at 2 charactors',
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      success: false,
      message: 'passord is required',
    });
  }

  if (req.body.password.length < 8) {
    return res.status(400).send({
      success: false,
      message: 'Minimum passord length is 8',
    });
  }

  const abc = /^[a-zA-Z]$/;
  if (abc.test(req.body.password)) {
    return res.status(400).send({
      success: false,
      message: 'invalid password. must contain at least 1 special charactor',
    });
  }

  const user = {
    id: data.length + 1,
    email: 'sarah@gmail.com',
    fist_name: 'Sarah',
    last_name: 'Lifaefi Masika',
    password: 'usr$_18@',
    is_admin: false,
  };

  data.push(user);
  return res.status(201).send({
    status: 'success',
    message: 'user registered successfully',
    data,
  });
});

/**
 * Sign in a user
 * @param {object} req
 * @param {object} res
 */
app.post(`${baseUrl}auth/signin`, (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      status: 'error',
      error: 'email is required',
    });
  }

  const email = /.+@.+\..+/;
  if (!email.test(req.body.email)) {
    return res.status(400).send({
      status: 'error',
      error: 'email is invalid',
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      status: 'error',
      error: 'passord is required',
    });
  }

  const findUserByEmail = (email) => data.find(user => user.email === email);
  const foundUser = findUserByEmail(req.body.email);

  if (!foundUser) {
    return res.status(404).send({
      status: 'error',
      error: 'user does not exist, register first',
    });
  }

  if (foundUser) {
    return res.status(200).send({
      status: 'success',
      data: foundUser,
    });
  }
});

const port = 5000;

app.listen(port, () => {
  // console.log(`The server running on port ${PORT}`);
});

export default app;
