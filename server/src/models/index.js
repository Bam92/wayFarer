import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const config = {
  user: 'andela9',
  database: 'wayfarer_db',
  password: 'andela',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

export default {
  /**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
