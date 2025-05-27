import dotenv from 'dotenv'
dotenv.config();

import { Pool } from 'pg';

// console.log({
//   user: process.env.DB_USER,
//   password: process.env.DB_USER_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
// });


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_USER_PASSWORD),
  port: Number(process.env.DB_PORT),
});

export default pool;