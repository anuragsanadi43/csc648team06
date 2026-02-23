/**
 * Controllers for subject API routes
 *
 * This file contains all controller logic for getting
 * subjects
 *
 * Each exported function receives (req, res) and interacts
 * with the MySQL database using the shared `pool` instance.
 *
 */

import { pool } from "../db.js";

export const getSubjects = async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT Subject_id, Subject_name FROM Subject ORDER BY Subject_id DESC LIMIT 50");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
};