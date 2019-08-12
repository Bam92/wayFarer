import Helper from '../middleware/Helper';

import db from '../models/index';

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

    const { email, first_name, last_name, password, is_admin } = req.body;

    /* ----- manuel validation -----*/
    if (!email) return res.status(status).send({ status, success, message: 'email is required' });

    if (!Helper.isValidEmail(email)) return res.status(status).send({ status, success, message: 'email is invalid' });

    if (!first_name || !last_name) return res.status(status).send({ status, success, message: 'first name or last name is required' });

    if (!Helper.isValidString(first_name) || !Helper.isValidString(last_name)) {
      return res.status(status).send({ status, success, message: 'first name or last name contains invalid charactor(s)'});
    }

    if (first_name.length < 2 || last_name.length < 2) {
      return res.status(status).send({ status, success, message: 'first name or last name must contain at 2 charactors' });
    }

    if (!password) return res.status(status).send({ status, success, message: 'passord is required' });

    if (password.length < 8) return res.status(status).send({ status, success, message: 'Minimum passord length is 8' });

    if (Helper.isValidPassword(password)) return res.status(status).send({ status, success, message: 'Invalid password. Must contain at least 1 special charactor' });

    /* ----- end validation -------*/

    const hashedpassword = Helper.hashPassword(password);

    const text = 'INSERT INTO users(email, first_name, last_name, password, is_admin) VALUES($1, $2, $3, $4, $5) RETURNING *';
    let values = [email, first_name, last_name, hashedpassword, true];
    if (is_admin === undefined || is_admin === null) values = [email, first_name, last_name, hashedpassword, false];

    try {
      const { rows } = await db.query(text, values);
      rows[0].token = Helper.generateToken(rows[0].id);
      delete rows[0].password;
      success = true;
      status = 201;

      return res.status(status).send({ status, success, message: 'User signed up successfully', data: rows[0] });
    } catch (error) {
      if (error.routine === '_bt_check_unique') return res.status(status).send({ status, success, message: 'User with this email already exists.' });
      return res.status(status).send({ status, success, message: 'There was something wrong. Try again', error });
    }
  },

  async login(req, res) {
    let success = false;
    let status = 400;

    const { email, password } = req.body;

    /* ----- manuel validation -----*/
    if (!email) return res.status(status).send({ status, success, message: 'email is required' });

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) return res.status(status).send({ status, success, message: 'email is invalid' });
    if (!password) return res.status(status).send({ status, success, message: 'password is required' });

    const text = 'SELECT * FROM users WHERE email = $1';

    try {
      const { rows } = await db.query(text, [email]);

      if (!rows[0]) return res.status(status).send({ status, success, message: 'Sorry, user with this login does not exist, register first' });
      if (!Helper.comparePassword(rows[0].password, password)) return res.status(status).send({ status, success, message: 'Sorry, password is incorrect. Check again.' });

      rows[0].token = Helper.generateToken(rows[0].id);
      delete rows[0].password;
      success = true;
      status = 201;

      return res.status(status).send({ status, success, message: 'User Logged in successfully', data: rows[0] });
    } catch (error) {
      return res.status(status).send({ status, success, message: 'There was something wrong. Try again', error });
    }
  },
};

export default Auth;

/*
 * Sign in a user
 * @param {object} req
 * @param {object} res

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
*/
