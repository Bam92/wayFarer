import jwt from 'jsonwebtoken';
//import privateKey from '../config';

const signToken = playload => jwt.sign({
    data: playload
}, 'privateKey', { expiresIn: '1h' });

export default signToken;