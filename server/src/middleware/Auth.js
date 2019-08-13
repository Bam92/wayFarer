import jwt from 'jsonwebtoken';
import privateKey from '../config';

import { runQuery } from '../../db';

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const { token: headerToken = '' } = req.headers;

    if (!headerToken) {
      return res.status(403).json({
        status: 403,
        message: 'No token provided',
      });
    }

    try {
      const decoded = await jwt.verify(headerToken, privateKey);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await runQuery(text, [decoded.userId]);
      console.log('decoded id is ', rows[0].is_admin);
      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }

   req.currentUser = rows[0];

      console.log('current usr ', req.currentUser)
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Verify Admin
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyAdmin(req, res, next) {
    const { currentUser } = req;

    console.log('current user not admin', currentUser.is_admin)
    if (currentUser.is_admin === 'false') {
      return res.status(403).json({
        status: 403,
        message: 'Only admin can proceed this action',
      });
    }
    next();
  },
};

export default Auth;
