import uid from 'uid';
import data from '../db/data';

const findUserByEmail = email => data.find(user => user.email === email);
const findUserById = id => data.find(user => user.id === id);
const save = (email, first, last, pass) => {
  const newUser = {
    id: uid(10),
    email,
    first_name: first,
    last_name: last,
    password: pass,
    is_admin: false,
  };

  data.push(newUser);
  return newUser;
};

const findAll = () => data;

export default {
  findUserByEmail,
  save,
  findAll,
  findUserById,
};
