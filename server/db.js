import { Pool } from 'pg';
import 'dotenv/config';
// const dotenv = require('dotenv');

const {
  DATABASE_URL, PSQL_USER, PSQL_DB, PSQL_PASS, PSQL_PORT,
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

const pool = new Pool(config);

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    is_admin VARCHAR(128) NOT NULL
  )`;

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

/**
 * Create Trip Table
 */
const createTripTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  trips(
    id SERIAL PRIMARY KEY,
    seating_capacity INT NOT NULL,
    bus_license_number VARCHAR(128) NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    date TIMESTAMP,
    fare VARCHAR(128) NOT NULL,
    status VARCHAR(128) NOT NULL
  )`;

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

/**
 * Drop User Tables
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
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

/**
 * Drop Trip Tables
 */
const dropTripTable = () => {
  const queryText = 'DROP TABLE IF EXISTS trips returning *';
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

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createTripTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropTripTable();
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

const getAll = query => new Promise((resolve, reject) => {
  pool.query(query)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

/*const getAll = q => pool.query(q, (err, res) => {
  console.log(err, res)
  pool.end();
});*/


module.exports = {
  createUserTable,
  createTripTable,
  createAllTables,
  dropUserTable,
  dropTripTable,
  dropAllTables,
  pool,
  runQuery,
  getAll,
};

require('make-runnable');
