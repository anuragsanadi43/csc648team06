/**
 * Controllers for health API route
 *
 * This file contains the controller logic for checking 
 * health of db connection
 * 
 * Each exported function receives (req, res) and interacts
 * with the MySQL database using the shared `pool` instance.
 *
 */


import { pool } from "../db.js";

export const health = async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: rows?.[0]?.ok === 1 });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "DB not reachable" });
  }
};