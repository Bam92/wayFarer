import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import privateKey from '../config';

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
   * isValidString helper method
   * @param {string} name
   * @returns {Boolean} True or False
   */
  isValidString(name) {
    return /^[0-9a-zA-Z]+$/.test(name);
  },

  /**
   * isValidPassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
  isValidPassword(password) {
    return /^[a-zA-Z]$/.test(password);
  },

  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(id, privateKey);
    return token;
  },
};

export default Helper;
