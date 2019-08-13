import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import privateKey from '../config';

import { runQuery } from '../../db';

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
   * @param {string} email
   * @returns {string} token
   */
  generateToken(email) {
    const token = jwt.sign({
      email,
    }, privateKey);

    return token;
  },

   /**
   * Verify a Trip
   * @param {string} origin
   * @returns {string} destination
   */
  verifyTrip(from, to) {
    console.log('dest: ', from, 'or: ', to)
    const text = 'SELECT * FROM trips WHERE origin = $1 AND destination = $2';
    const row = runQuery(text, [from, to]);
    if (row[0]) return true;
    return false;
  },

};

export default Helper;
