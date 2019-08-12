import jwt from 'jsonwebtoken';
import privateKey from '../config';
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
    const currentUser = user.findUserById(decoded.id);

    if (!currentUser) {
      return res.status(403).json({
        status: 403,
        error: 'Invalid token or token expired',
      });
    }
    console.log('test: ', decoded)
    req.currentUser = currentUser;
    return next();
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
