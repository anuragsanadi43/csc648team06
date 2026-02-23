/**
 * Controllers for user message API routes
 *
 * This file contains all controller logic for getting
 * and editing user profiles
 *
 * Each exported function receives (req, res) and interacts
 * with the MySQL database using the shared `pool` instance.
 *
 */

import { pool } from "../db.js";
import fs from "fs/promises";
import path from "path";

const PORTRAIT_FOLDER = path.join(process.cwd(), "uploads/portraits");

export const getUsers = async (_req, res) => {
  try {
    // Get the email query parameter if it exists, otherwise, set it to null
    const email = _req.query.q || null;

    // Base query
    let query = "SELECT User_id, First_name, Last_name, Email, Major, Minor, Portrait_path FROM Registered_User";

    // If email is provided, use a LIKE query to search for partial matches
    if (email) {
      query += " WHERE Email LIKE ?";
    }

    query += " ORDER BY User_id DESC LIMIT 50";

    // Fetch rows from the database
    const [rows] = await pool.query(query, email ? [`%${email}%`] : []); // Use %% to match any part of the email

    // Map the result to include the full URL for portrait image
    const users = rows.map(u => ({
      ...u,
      portraitUrl: u.Portrait_path
        ? `${_req.protocol}://${_req.get("host")}/images/${u.Portrait_path}`
        : "",
    }));

    // Send back the users as a JSON response
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
};



export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const file = req.file;

  try {
    const { first_name, last_name, major, minor, phone_number, bio } = req.body;

    // Get current portrait for cleanup
    const [[current]] = await pool.query(
      "SELECT Portrait_path FROM Registered_User WHERE User_id = ?",
      [userId]
    );

    const fields = [];
    const values = [];

    if (first_name) { fields.push("First_name = ?"); values.push(first_name); }
    if (last_name) { fields.push("Last_name = ?"); values.push(last_name); }
    if (major) { fields.push("Major = ?"); values.push(major); }
    if (minor !== undefined) { fields.push("Minor = ?"); values.push(minor || null); }
    if (phone_number !== undefined) { fields.push("Phone_number = ?"); values.push(phone_number || null); }
    if (bio !== undefined) { fields.push("Bio = ?"); values.push(bio || null); }

    if (file) {
      // Store only the filename
      fields.push("Portrait_path = ?");
      values.push(file.filename);
    }

    if (!fields.length) {
      if (file) await fs.unlink(path.join(PORTRAIT_FOLDER, file.filename));
      return res.status(400).json({ message: "Nothing to update" });
    }

    values.push(userId);

    await pool.query(
      `UPDATE Registered_User SET ${fields.join(", ")} WHERE User_id = ?`,
      values
    );

    // Remove old portrait if it exists
    if (file && current?.Portrait_path) {
      const oldPath = path.join(PORTRAIT_FOLDER, current.Portrait_path);
      await fs.unlink(oldPath).catch(() => {});
    }

    res.json({ message: "Profile updated" });

  } catch (error) {
    if (file) await fs.unlink(path.join(PORTRAIT_FOLDER, file.filename)).catch(() => {});
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `SELECT User_id, First_name, Last_name, Major, Minor, Email, Phone_number, Bio, Portrait_path
       FROM Registered_User
       WHERE User_id = ?`,
      [userId]
    );

    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    // Map filename to full URL
    user.portraitUrl = user.Portrait_path
      ? `${req.protocol}://${req.get("host")}/images/${user.Portrait_path}`
      : "";

    // Remove raw filename from response
    delete user.Portrait_path;

    res.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
