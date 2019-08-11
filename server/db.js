//import pg from 'pg';
const pg = require('pg');
//import dotenv from 'dotenv';
const dotenv = require('dotenv');

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

pool.on('connect', () => {
  console.log('Successfully connected to the data base');
});

/**
 * Create Tables
 */
const createTables = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    is_admin VARCHAR(128) NOT NULL
  )`;

  pool.query(userTable)
    .then((res) => {
    console.log(res);
      pool.end();
    })
    .catch((err) => {
    console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS user';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = { createTables, pool, dropTables };

require('make-runnable')
