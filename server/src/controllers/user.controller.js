import user from '../models/user.model';
import trips from '../models/trip.model';

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
        status: error,
        error: 'invalid password. must contain at least 1 special charactor',
      });
    }

    const saveUser = user.save(req.body.email, req.body.first_name, req.body.last_name, req.body.password)

    if (saveUser) {
    return res.status(201).send({
      status: 'success',
      message: 'user registered successfully',
      data: user.findAll(),
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

    const foundUser = user.findUserByEmail(req.body.email, req.body.password);

    if (!foundUser) {
      return res.status(404).send({
        status: 'error',
        error: 'user with login/pass does not exist, register first',
      });
    }

    if (foundUser) {
      return res.status(200).send({
        status: 'success',
        data: foundUser,
      });
    }
  }

  getTrips(req, res) {
    return res.status(201).send({
      status: 'success',
      data: trips.findAllTrips(),
    });
  }
}



const userController = new UserController();
export default userController;
