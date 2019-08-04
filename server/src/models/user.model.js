import data from '../db/data';

const findUserByEmail = (email, pass) => data.find(user => user.email === email && user.password === pass);

const save = (email, first, last, pass) => {
  console.log('hashpaa', pass)
  //if (findUserByEmail) user should not be registered twice
  const newUser = {
    id: data.length + 1,
    email,
    fist_name: first,
    last_name: last,
    password: pass,
    is_admin: false,
  };

  data.push(newUser);
  return newUser;
}

const findAll = () => data;

export default {
  findUserByEmail,
  save,
  findAll,
};
