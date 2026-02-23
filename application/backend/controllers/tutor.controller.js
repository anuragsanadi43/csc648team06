/**
 * Controllers for apply for tutor API routes
 *
 * This file contains all controller logic for handling
 * tutor applications
 *
 * Each exported function receives (req, res) and interacts
 * with the MySQL database using the shared `pool` instance.
 *
 */

import { pool } from "../db.js";
import fs from "fs/promises";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/cv"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

export const upload = multer({ storage: storage }).single("cv");


export const applyForTutor = async (req, res) => {
  console.log("hi");
  const connection = await pool.getConnection();
  //console.log(req);
  const file = req.file;

  try {
    const { id } = req.user;


    const courseTitle = req.body.courseTitle;
    const course = req.body.course;
    const department = req.body.department;
    //const tutorId = req.user.id; // maps to Registered_User.User_id

    if (!id || !file) {
      if (file) await fs.unlink(file.path);
      return res.status(400).json({ message: "Missing required fields" });
    }

    await connection.beginTransaction();

    // Save only the filename in the DB
    const cvFilename = file.originalname;

    //search subject table for subject_id
    const [subjectResult] = await connection.query(
      `SELECT * FROM Subject WHERE Subject_name = ?`,
      [department]
    ); 


    var subject_id;
    var course_id;
    try {
      subject_id = subjectResult[0].Subject_id;
      console.log("subject_id: " + subject_id);

      const [courseResult] = await connection.query(
      `INSERT INTO Course (Class_num, Course_name, subject_id) VALUES (?, ?, ?)`,
      [course, courseTitle, subject_id]
    ); 

    console.log("executed sql statement");
    
    const [result] = await connection.query(
      `INSERT INTO Tutor_Entry (tutor_ID, course_id, cv_path, status)
       VALUES (?, ?, ?, 'pending')`,
      [id, courseResult.insertId, cvFilename]
    );

    course_id = courseResult.insertId;

    console.log("inserted entry into Tutor_Entry table successfully");

  } catch (err) {
      console.log(err);
  }

    // Insert tutor entry (application)

    await connection.commit();

    res.status(201).json({
      message: "Tutor application submitted",
      tutor_entry_id: id,
      status: "pending",
      cvUrl: `${req.protocol}://${req.get("host")}/cv/${cvFilename}`
    });

  } catch (error) {
    await connection.rollback();

    if (file) {
      try {
        await fs.unlink(file.path);
      } catch (cleanupErr) {
        console.error("CV cleanup failed:", cleanupErr);
      }
    }

    console.error("Apply tutor error:", error);
    res.status(500).json({ message: "Server error" });

  } finally {
    connection.release();
  }
};
