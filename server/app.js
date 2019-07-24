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

  if (!req.body.first_name || !req.body.last_name) {
    return res.status(400).send({
      status: 'error',
      error: 'first name or last name is required',
    });
  }

  const letters = /^[0-9a-zA-Z]+$/; // names must only contain alphanumeric char
  if (!letters.test(req.body.first_name) || !letters.test(req.body.last_name)) {
    return res.status(400).send({
      status: 'error',
      error: 'first name or last name contains invalid charactor(s)',
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      status: 'error',
      error: 'passord is required',
    });
  }

  const findUserByEmail = (email) => data.find(user => user.email === email);
  //let foundUser = findUserByEmail(req.body.email);
  if (!findUserByEmail(req.body.email)) {
    return res.status(404).send({
      status: 'error',
      error: 'user does not exist, register first',
    });
  }

  if (findUserByEmail(req.body.email)) {
    return res.status(200).send({
      status: 'success',
      data: findUserByEmail(req.body.email),
    });
  }
});

const port = 5000;

app.listen(port, () => {
  // console.log(`The server running on port ${PORT}`);
});

export default app;
