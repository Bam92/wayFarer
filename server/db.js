import { Pool } from 'pg';
import 'dotenv/config';

const { DATABASE_URL } = process.env;


const pool = new Pool({
  connectionString: DATABASE_URL,
});

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
    is_admin BOOLEAN NOT NULL
  )`;

  pool.query(queryText)
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
      pool.end();
      process.exit(0);
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
    .catch(() => {
      pool.end();
      process.exit(0);
    });
};

/**
 * Create Booking Table
 */
const createBookingTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  bookings(
    id SERIAL NOT NULL,
    trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_on TIMESTAMP,
    PRIMARY KEY(trip_id, user_id)
  )`;

  pool.query(queryText)
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
      process.exit(0);
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
      pool.end();
      process.exit(0);
    });
};

/**
 * Drop Trip Table
 */
const dropTripTable = () => {
  const queryText = 'DROP TABLE IF EXISTS trips';
  pool.query(queryText)
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
      pool.end();
      process.exit(0);
    });
};

/**
 * Drop Booking Table
 */
const dropBookingTable = () => {
  const queryText = 'DROP TABLE IF EXISTS bookings';
  pool.query(queryText)
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
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
  createBookingTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropTripTable();
  dropBookingTable();
};


pool.connect()
  .then(() => {
  })
  .catch(() => {
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
const runq = (text, params) => {
  const row = pool.query(text, params);
  return row;
};
const getAll = query => new Promise((resolve, reject) => {
  pool.query(query)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = {
  createUserTable,
  createTripTable,
  createAllTables,
  dropUserTable,
  dropTripTable,
  dropBookingTable,
  dropAllTables,
  pool,
  runQuery,
  runq,
  getAll,
  createBookingTable,
};

require('make-runnable');
