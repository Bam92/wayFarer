import { Pool } from 'pg';
import 'dotenv/config';

import Helper from '../middleware/Helper';

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
 * Create Admin User
 */
const createAdmin = () => {
  const hashedpassword = Helper.hashPassword('@dminuser');
  const queryText = 'INSERT INTO users(email, first_name, last_name, password, is_admin)  VALUES ($1, $2, $3, $4, $5)';

  pool.query(queryText, ['admin.test@wayfarer.cd', 'Admin', 'User', hashedpassword, true])
    .then((res) => {
      pool.end();
      process.exit(0);
    })
    .catch((err) => {
      pool.end();
      process.exit(1);
    });
};


module.exports = {
  createAdmin,
};

require('make-runnable');
