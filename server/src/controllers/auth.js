import Helper from '../middleware/Helper';
import { runQuery, getAll } from '../../db';

const Auth = {
  /**
   * Create a new User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async signup(req, res) {
    let success = false;
    let status = 400;

    const {
      email, first_name, last_name, password,
    } = req.body;

    /* ----- manuel validation -----*/
    if (!email) return res.status(status).send({ status, success, error: 'email is required' });

    if (!Helper.isValidEmail(email)) return res.status(status).send({ status, success, error: 'email is invalid' });

    if (!first_name || !last_name) return res.status(status).send({ status, success, error: 'first name or last name is required' });

    if (!Helper.isValidString(first_name) || !Helper.isValidString(last_name)) {
      return res.status(status).send({ status, success, error: 'first name or last name contains invalid charactor(s)' });
    }

    if (first_name.length < 2 || last_name.length < 2) {
      return res.status(status).send({ status, success, error: 'first name or last name must contain at 2 charactors' });
    }

    if (!password) return res.status(status).send({ status, success, error: 'passord is required' });

    if (password.length < 8) return res.status(status).send({ status, success, error: 'Minimum passord length is 8' });

    if (Helper.isValidPassword(password)) return res.status(status).send({ status, success, error: 'Invalid password. Must contain at least 1 special charactor' });

    /* ----- end validation -------*/

    const hashedpassword = Helper.hashPassword(password);

    const text = 'INSERT INTO users(email, first_name, last_name, password, is_admin) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [email, first_name, last_name, hashedpassword, false];

    try {
      const { rows } = await runQuery(text, values);
      rows[0].token = Helper.generateToken(rows[0].email);
      delete rows[0].password;
      success = true;
      status = 201;

      return res.status(status).json({
        status, success, message: 'User signed up successfully', data: rows[0],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') return res.status(409).json({ status: 409, success, error: 'User with this email already exists.' });
      return res.status(status).json({ status, success, error: error.message });
    }
  },

  async login(req, res) {
    let success = false;
    let status = 400;

    const { email, password } = req.body;

    /* ----- manuel validation -----*/
    if (!email) return res.status(status).json({ status, success, error: 'email is required' });

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) return res.status(status).json({ status, success, error: 'email is invalid' });
    if (!password) return res.status(status).json({ status, success, error: 'password is required' });

    const text = 'SELECT * FROM users WHERE email = $1';

    try {
      const { rows } = await runQuery(text, [email]);

      if (!rows[0]) return res.status(404).json({ status: 404, success, error: 'Sorry, user with this login does not exist, register first' });
      if (!Helper.comparePassword(rows[0].password, password)) return res.status(401).json({ status: 401, success, message: 'Sorry, password is incorrect. Check again.' });

      rows[0].token = Helper.generateToken(rows[0].email);
      delete rows[0].password;
      success = true;
      status = 200;

      return res.status(status).json({
        status, success, message: 'User Logged in successfully', data: rows[0],
      });
    } catch (error) {
      return res.status(status).json({
        status, success, error: error.message,
      });
    }
  },
};

export default Auth;
