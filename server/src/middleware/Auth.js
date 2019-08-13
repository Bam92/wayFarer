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
      if (!decoded) return res.status(400).json({ status: 400, error: 'The token you provided is invalid' });

      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await runQuery(text, [decoded.userId]);

      if (!rows[0]) {
        return res.status(400).json({ status: 400, error: 'The token you provided is invalid' });
      }

      req.currentUser = rows[0];

      next();
    } catch (error) {
      return res.status(400).json({ status: 400, error: error.message });
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

    console.log('current user not admin', currentUser.is_admin);
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
