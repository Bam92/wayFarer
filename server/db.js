import { Pool } from 'pg';
// const pg = require('pg');
import 'dotenv/config';
// const dotenv = require('dotenv');

const {
 DATABASE_URL, PSQL_USER, PSQL_DB, PSQL_PASS, PSQL_PORT
} = process.env;

let config;

if (PSQL_USER) {
  config = {
    user: PSQL_USER,
    database: PSQL_DB,
    password: PSQL_PASS,
    port: PSQL_PORT,
  };
} else {
  config = {
    connctionString: DATABASE_URL,
  };
}
console.log('user', PSQL_USER);
console.log('CONFIG: ', config);


console.log('env: ', DATABASE_URL);
const pool = new Pool(config);


/**
 * Create Tables
 */
const createTables = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    is_admin VARCHAR(128) NOT NULL
  )`;

  pool.query(userTable)
    .then((res) => {
      console.log(res);
      pool.end();
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
      process.exit(1);
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
      process.exit(1);
    });
};


pool.connect()
  .then(() => {
    console.info('Postgress connected');
  })
  .catch((err) => {
    console.log(err);
    const error = 'Postgress could not connect';
    console.error(error);
  });

/**
     * DB Query
     * @param {string} text
     * @param {Array} params
     * @returns {object} object
     */
const runQuery = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});


module.exports = {
  createTables, pool, dropTables, runQuery,
};

require('make-runnable');
