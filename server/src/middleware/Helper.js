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
    return /^[a-zA-Z]+$/.test(name);
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
  async verifyTrip(licenseNumber) {
    const text = 'SELECT * FROM trips WHERE bus_license_number = $1';
    const row = await runQuery(text, [licenseNumber]);

    if (row.rowCount === 0) return false;
    if (row.rowCount === 1) return true;
  },

  /**
   * Verify if a Trip exists
   * @param {integer} id
   * @returns {bool}
   */
  async tripExist(id) {
    const tripId = parseInt(id, 10);
    const text = `SELECT * FROM trips WHERE id = ${tripId}`;
    const row = await runQuery(text);

    if (row.rowCount === 0) return false;
    if (row.rowCount === 1) return true;
  },

  /**
   * Verify if a booking exists for a given user
   * @param {integer} id
   * @returns {bool}
   */
  async bookingExist(book_id, user_id) {
    const text = 'SELECT * FROM bookings WHERE id = $1 AND user_id = $2';
    const value = [book_id, parseInt(user_id)];

    try {
      const row = await runQuery(text, value);

      if (row.rowCount === 0) return false;
      if (row.rowCount === 1) return true;
    } catch (error) {
      return error.message;
    }
  },

  /**
   * Get one Trip
   * @param {integer} id
   * @returns
   */
  async getTrip(id) {
    const text = 'SELECT * FROM trips WHERE id = $1';
    const row = await runQuery(text, [id]);
    return row.rows[0];
  },

  /**
   * Get one User
   * @param {integer} id
   * @returns
   */
  async getUser(id) {
    const text = 'SELECT * FROM users WHERE id = $1';
    const row = await runQuery(text, [id]);
    return row.rows[0];
  },

  /**
   * Get all bookings
   * @returns bookings
   */
  async getBookings() {
    const text = 'SELECT * FROM bookings RETURNING *';
    const row = await runQuery(text);

    return row.rows;
  },
};

export default Helper;
