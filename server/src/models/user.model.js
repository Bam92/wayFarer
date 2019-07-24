import data from '../../db/data';

const findUserByEmail = (email, pass) => data.find(user => user.email === email && user.password === pass);


export default {
  findUserByEmail,
};
