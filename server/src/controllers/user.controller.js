import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/middlewares';
import user from '../models/user.model';


class UserController {
/**
 * Register a user
 * @param {object} req
 * @param {object} res
 */
  signUpUser(req, res) {
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

    if (req.body.first_name.length < 2 || req.body.last_name.length < 2) {
      return res.status(400).send({
        status: 'error',
        error: 'first name or last name must contain at 2 charactors',
      });
    }

    if (!req.body.password) {
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

    const hashedPassWord = bcrypt.hashSync(req.body.password, 8);

    if (user.findUserByEmail(req.body.email)) {
      return res.status(409).send({
        status: 'error',
        error: 'user exists already',
      });
    }

    const saveUser = user.save(req.body.email, req.body.first_name, req.body.last_name, hashedPassWord)

    if (saveUser) {
      const UserToken = generateToken({ id: saveUser.id });
      saveUser.token = UserToken;
   //delete saveUser.password;
    return res.status(201).send({
      status: 'success',
      message: 'user registered successfully',
      data: saveUser,
    });}
  }

  /**
 * Sign in a user
 * @param {object} req
 * @param {object} res
 */
  logInUser(req, res) {
    if (!req.body.email) {
      return res.status(400).send({
        status: 'error',
        error: 'email is required',
      });
    }

    if (!req.body.password) {
      return res.status(400).send({
        status: 'error',
        error: 'passord is required',
      });
    }

    const foundUser = user.findUserByEmail(req.body.email);
    console.log('user email', user.findUserByEmail(req.body.email))

    if (!foundUser) {
      return res.status(404).send({
        status: 'error',
        error: 'user with this login does not exist, register first',
      });
    }

    //if (foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      console.log(foundUser.is_admin)
      const UserToken = generateToken({ id: foundUser.id });
      foundUser.token = UserToken;
      delete foundUser.password;
      return res.status(200).send({
        status: 'success',
        data: foundUser
      });} else {
        return res.status(400).send({
          status: 'Password not correct',
          //data: foundUser
        })
      }
    //}
  }

}

const userController = new UserController();
export default userController;
