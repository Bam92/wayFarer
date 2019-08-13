import jwt from 'jsonwebtoken';
import privateKey from '../config';

import { runQuery } from '../../db';

import user from '../models/user.model';

export const generateToken = playload => jwt.sign(playload, privateKey);

export const verifyToken = (req, res, next) => {
  const { token: headerToken = '' } = req.headers;
  if (!headerToken) {
    return res.status(403).json({
      status: 403,
      message: 'No token provided',
    });
  }
  jwt.verify(headerToken, privateKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: 403,
        error: err.message || 'Invalid token or token expired',
      });
    }

    console.log('test id: ', decoded.id, ' and token ', headerToken);

    const text = 'SELECT * FROM users WHERE id = $1';

    try {
      const { currentUser } = runQuery(text, [decoded.id]);

      req.currentUser = currentUser;

      console.log(req.currentUser, 'current user')
      return next();

      /*if (!currentUser[0]) return res.status(status).send({ status, success, message: 'Sorry, user with this login does not exist, register first' });

      success = true;
      status = 201;*/

     // return res.status(status).send({ status, success, message: 'User Logged in successfully', data: rows[0] });
    } catch (error) {
      console.log('someting wrong', error)
      return res.status(status).send({ status, success, message: 'There was something wrong. Try again', error });
    }

    //const currentUser = user.findUserById(decoded.id);
/*console.log(currentUser, 'current')


    if (!currentUser) {
      return res.status(403).json({
        status: 403,
        error: 'Invalid token or token expired',
      });
    }
    console.log('test: ', decoded);
    req.currentUser = currentUser;
    return next();*/
  });
};

export const verifyAdmin = (req, res, next) => {
  const { currentUser } = req;

  if (!currentUser.is_admin) {
    return res.status(403).json({
      status: 403,
      message: 'Only admin can proceed this action',
    });
  }

  next();
};
