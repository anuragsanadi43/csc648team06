/**
 * Database Connection Pool
 *
 * Creates and exports a MySQL connection pool using mysql2/promise.
 * All controllers and services should import `pool` from this file to
 * execute database queries.
 */

import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
