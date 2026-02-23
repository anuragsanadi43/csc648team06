/**
 * Controllers for API routes
 *
 * This file contains all controller logic for handling
 *
 * Each exported function receives (req, res) and interacts
 * with the MySQL database using the shared `pool` instance.
 *
 */

import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const health = async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: rows?.[0]?.ok === 1 });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "DB not reachable" });
  }
};

export const getUsers = async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT User_id, First_name, Last_name, Major, Minor FROM Registered_User ORDER BY User_id DESC LIMIT 50");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
};

export const getSubjects = async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT Subject_id, Subject_name FROM Subject ORDER BY Subject_id DESC LIMIT 50");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
};

export const searchTutors = async (req, res) => {
  try {
    const { q } = req.query; // search query from URL, e.g., /api/search/tutors?q=Alice

    let query, params;

    // If a search term is provided, apply filtering
    if (q) {
      const searchTerm = `%${q}%`; // Add wildcards for LIKE search
      query = `
        SELECT te.tutor_ID, te.first_name, te.last_name, c.Course_name, c.Class_num
        FROM Tutor_Entry te
        JOIN Course c ON te.course_id = c.Course_id
        WHERE te.first_name LIKE ? 
           OR te.last_name LIKE ? 
           OR c.Course_name LIKE ? 
           OR c.Class_num LIKE ?
        LIMIT 50`;  // Optional: Limit results to 50
      params = [searchTerm, searchTerm, searchTerm, searchTerm];
    } else {
      // If no search term, return all entries
      query = `
        SELECT te.tutor_entry_id, te.first_name, te.last_name, c.Course_name, c.Class_num
        FROM Tutor_Entry te
        JOIN Course c ON te.course_id = c.Course_id`;
      params = [];  // No parameters needed for "all entries" query
    }

    // Execute the query
    const [rows] = await pool.query(query, params);

    // Return the result
    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};

// Demo to show how to hash password using bcrypt
export const hashPasswordDemo = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashed = await bcrypt.hash(password, 10);

    res.json({ hashed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hashing failed" });
  }
};