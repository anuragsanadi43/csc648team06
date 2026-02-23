/**
 * Controllers for auth API routes
 *
 * This file contains all controller logic for handling 
 * login and registration
 *
 * Each exported function receives (req, res) and interacts
 * with the MySQL database using the shared `pool` instance.
 *
 */

import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, major, minor, phone_number } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2. Check if user already exists
    const [existing] = await pool.query(
      "SELECT User_id FROM Registered_User WHERE Email = ? LIMIT 1",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3. Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 4. Insert user into DB
    const [result] = await pool.query(
      `INSERT INTO Registered_User
       (Email, Password, First_name, Last_name, Major, Minor, Phone_number)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, hashed, first_name || null, last_name || null, major || null, minor || null, phone_number || null]
    );

    // 5. Return success
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertId,
        email,
        first_name: first_name || null,
        last_name: last_name || null,
        major: major || null,
        minor: minor || null,
        phone_number: phone_number || null
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    // Find user by email
    const [rows] = await pool.query(
      "SELECT * FROM Registered_User WHERE Email = ? LIMIT 1",
      [email]
    );

    console.log("in login");

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    // Check password
    const valid = await bcrypt.compare(password, user.Password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.User_id,
        email: user.Email,
        firstName: user.First_name,
        lastName: user.Last_name,
        major: user.Major,
        minor: user.Minor,
        phone_number: user.Phone_number
      },
      process.env.JWT_SECRET, // make sure you have this in .env
      { expiresIn: "1h" }
    );

    // Respond with token + user info
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.User_id,
        email: user.Email,
        firstName: user.First_name,
        lastName: user.Last_name,
        major: user.Major,
        minor: user.Minor,
        phone_number: user.Phone_number
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};