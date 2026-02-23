/**
 * Controllers for search API routes
 *
 * This file contains all controller logic for handling
 * search
 *
 * Each exported function receives (req, res) and interacts
 * with the MySQL database using the shared `pool` instance.
 *
 */

import { pool } from "../db.js";

export const searchBySubject = async (req, res) => {
  console.log("hi");
  try {
    const { q } = req.query;

    let query = `
      SELECT te.tutor_entry_id, ru.First_name, ru.Last_name, ru.Portrait_path,
             c.Course_name, c.Class_num, s.Subject_name
      FROM Tutor_Entry te
      JOIN Registered_User ru ON te.tutor_ID = ru.User_id
      JOIN Course c ON te.course_id = c.Course_id
      JOIN Subject s ON c.subject_id = s.Subject_id
      WHERE te.status = 'approved'
    `;

    const params = [];
/**The query structure is clean and parameterized 
 *
 *Since the frontend and QA tests include a subject dropdown, it may be useful to support an additional query parameter (e.g., subject or courseId) 
 *and extend the WHERE clause instead of relying on text matching.
 *
 */
    if (q) {
      const searchTerm = `%${q}%`;
      query += `
        AND s.Subject_name LIKE ?
      `;
      params.push(searchTerm);
    }

   //If a tutor teaches multiple courses, this query may return multiple rows for the same tutor.
   //Depending on frontend expectations, we may want to group results by tutor and aggregate Course_name values into a single subjects array.
    const [rows] = await pool.query(query, params);
    console.log(rows);
    // Map rows to frontend-friendly format

    //The mapping to a frontend-friendly format is clear and helpful.
    const tutors = rows.map(row => ({
      id: row.tutor_entry_id,
      name: `${row.First_name} ${row.Last_name}`,
      image: row.Portrait_path
        ? `${req.protocol}://${req.get("host")}/images/${row.Portrait_path}`
        : "", // fallback if no image
      sessionsCompleted: 0, // you can calculate if needed
      subjects: row.Course_name ? [row.Course_name] : [], // string array for frontend
      department: row.Subject_name,
    }));

    res.json(tutors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};


export const searchTutors = async (req, res) => {
  try {
    const { q } = req.query;

    let query = `
      SELECT te.tutor_entry_id, ru.First_name, ru.Last_name, ru.Portrait_path,
             c.Course_name, c.Class_num, s.Subject_name
      FROM Tutor_Entry te
      JOIN Registered_User ru ON te.tutor_ID = ru.User_id
      JOIN Course c ON te.course_id = c.Course_id
      JOIN Subject s ON c.subject_id = s.Subject_id
      WHERE te.status = 'approved'
    `;

    const params = [];
/**The query structure is clean and parameterized 
 *
 *Since the frontend and QA tests include a subject dropdown, it may be useful to support an additional query parameter (e.g., subject or courseId) 
 *and extend the WHERE clause instead of relying on text matching.
 *
 */
    if (q) {
      const searchTerm = `%${q}%`;
      query += `
        AND (ru.First_name LIKE ?
           OR ru.Last_name LIKE ?
           OR c.Course_name LIKE ?
           OR c.Class_num LIKE ?)
      `;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

   //If a tutor teaches multiple courses, this query may return multiple rows for the same tutor.
   //Depending on frontend expectations, we may want to group results by tutor and aggregate Course_name values into a single subjects array.
    const [rows] = await pool.query(query, params);

    // Map rows to frontend-friendly format

    //The mapping to a frontend-friendly format is clear and helpful.
    const tutors = rows.map(row => ({
      id: row.tutor_entry_id,
      name: `${row.First_name} ${row.Last_name}`,
      image: row.Portrait_path
        ? `${req.protocol}://${req.get("host")}/images/${row.Portrait_path}`
        : "", // fallback if no image
      sessionsCompleted: 0, // you can calculate if needed
      subjects: row.Course_name ? [row.Course_name] : [], // string array for frontend
    }));

    res.json(tutors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};
