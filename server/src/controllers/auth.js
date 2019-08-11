import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import { body } from 'express-validator';

import { generateToken } from '../middleware/middlewares';
import user from '../models/user.model';


class Auth {
/**
 * Register a user
 * @param {object} req
 * @param {object} res
 */

  async signup(req, res, next) {
    let success = false;
    let status = 201;

    const { email, first_name, last_name, password } = req.body;

    if (!email) {
      return res.status(400).send({
        status: 400,
        message: 'email is required',
      });
    }

    //validate(email).isEmail();
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: 400,
        message: 'email is invalid',
      });
    }

    if (!req.body.first_name || !req.body.last_name) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'first name or last name is required',
      });
    }

    const letters = /^[0-9a-zA-Z]+$/; // names must only contain alphanumeric char
    if (!letters.test(req.body.first_name) || !letters.test(req.body.last_name)) {
      return res.status(400).send({
        status: 400,
        message: 'first name or last name contains invalid charactor(s)',
      });
    }

    if (req.body.first_name.length < 2 || req.body.last_name.length < 2) {
      return res.status(400).send({
        status: 400,
        message: 'first name or last name must contain at 2 charactors',
      });
    }

    if (!password) {
      return res.status(400).send({
        status: 'error',
        error: 'passord is required',
      });
    }

    if (req.body.password.length < 8) {
      return res.status(400).send({
        status: 'error',
        error: 'Minimum passord length is 8',
      });
    }

    const abc = /^[a-zA-Z]$/;
    if (abc.test(req.body.password)) {
      return res.status(400).send({
        status: 'error',
        error: 'invalid password. must contain at least 1 special charactor',
      });
    }

    try {
      const foundUser = await user.findUserByEmail(email);
      if (foundUser) {
        status = 400;
        success = false;
        return res.status(status).json({ status, success, message: `${email} user already exists` });
      }
    } catch (error) {
      status = 400;
      success = false;
      return res.status(status).json({ status, success, message: 'Failed, please try again' });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const saveUser = await user.save(email, first_name, last_name, hashedpassword);

    if (saveUser.id) {
      const UserToken = generateToken({ id: saveUser.id });
      saveUser.token = UserToken;
      success = true;
      return res.status(status).json({ status, success, message: 'User signed up successfully', data: saveUser });
    }
  }

  /**
 * Sign in a user
 * @param {object} req
 * @param {object} res
 */
  async login(req, res) {
    let success = false;
    let status = 201;

    const { email, password } = req.body;

    if (!email) {
      status = 400;
      return res.status(status).send({ status, success, message: 'email is required' });
    }

    if (!password) {
      status = 400;
      return res.status(status).send({ status, success, message: 'passord is required' });
    }

    const foundUser = user.findUserByEmail(email);


    if (!foundUser) {
      status = 404;
      return res.status(status).send({ status, success, message: 'user with this login does not exist, register first' });
    }

    const UserToken = generateToken({ id: foundUser.id });
    const comparePass = bcrypt.compareSync(password, foundUser.password);

    if (!comparePass) {
      status = 400;
      return res.status(status).json({ status, success, message: 'Your password is not correct' });
    }

    foundUser.token = UserToken;
    success = true;
    delete foundUser.password;
    return res.status(status).send({ status, success, message: 'User successfully logged in', data: foundUser });

  }
}

const auth = new Auth();
export default auth;