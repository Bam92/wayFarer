import data from '../db/data';

const findUserByEmail = (email, pass) => data.find(user => user.email === email && user.password === pass);

const save = (email, first, last, pass) => {
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
  return true;
}

const findAll = () => {return data;}


export default {
  findUserByEmail,
  save,
  findAll,
};
