import jwt from 'jsonwebtoken';
import privateKey from '../config';

const generateToken = playload => jwt.sign({
  data: playload,
}, privateKey, { expiresIn: '1h' });

// FORMAT OF TOKEN
// Authorization: Andela <access_token>

const verifyToken = (req, res) => {
  const getHeader = req.headers['authorization'];
  if (typeof getHeader !== 'undefined') {
    const header = getHeader.split(' ');
    const headerToken = header[1];
    req.token = headerToken;
    return req.token;
    //next();
  } else {
    res.sendStatus(403);
  }
};

export default { generateToken, verifyToken };
