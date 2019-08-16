import { Pool } from 'pg';
import 'dotenv/config';

import Helper from '../middleware/Helper';

const { DATABASE_URL } = process.env;


const pool = new Pool({
  connectionString: DATABASE_URL,
});

/**
 * Create Admin User
 */
const createAdmin = () => {
  const hashedpassword = Helper.hashPassword('@dminuser');
  const queryText = 'INSERT INTO users(email, first_name, last_name, password, is_admin)  VALUES ($1, $2, $3, $4, $5)';

  pool.query(queryText, ['admin.test@wayfarer.cd', 'Admin', 'User', hashedpassword, true])
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
      pool.end();
      process.exit(0);
    });
};


module.exports = {
  createAdmin,
};

require('make-runnable');
