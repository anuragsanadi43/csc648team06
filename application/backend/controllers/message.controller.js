/**
 * Controllers for message API routes
 *
 * This file contains all controller logic for handling
 * messages
 *
 * Each exported function receives (req, res) and interacts
 * with the MySQL database using the shared `pool` instance.
 *
 */


import { pool } from "../db.js";

export const sendMessage = async (req, res) => {
  try {
    const senderID = req.body.senderID;
    const receiverID = req.body.receiverID;
    const message = req.body.messageText;
    console.log(senderID, receiverID, message);

    // Validate input
    // if (!receiver_id || !message) {
    //   return res.status(400).json({
    //     message: "receiver_id and message are required"
    //   });
    // }

    // // Prevent sending message to yourself 
    // if (Number(receiver_id) === senderId) {
    //   return res.status(400).json({
    //     message: "Cannot send message to yourself"
    //   });
    // }

    // Insert message
    const [senderRows] = await pool.query(
      `SELECT User_id FROM Registered_User WHERE Email = ?`, 
      [senderID]
    );

    if (senderRows.length === 0) {
      return res.status(400).json({ error: "Sender not found" });
    }

    const senderUserId = senderRows[0].User_id;

    console.log(senderUserId);

    // 2. Now insert with verified IDs
    const [insertResult] = await pool.query(
      `INSERT INTO Message_Entry (Sender_id, Receiver_id, Message)
      VALUES (?, ?, ?)`,
      [senderUserId, receiverID, message]
    );

    res.status(201).json({
      message: "Message sent",
      message_id: insertResult.insertId
    });

  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


export const getConversation = async (req, res) => {
  try {
    const { senderID, receiverID } = req.params;

    if (!receiverID) {
      return res.status(400).json({
        message: "Invalid user id"
      });
    }

    const [rows] = await pool.query(
      `SELECT
     m.Message_id,
     u.First_name,   
     m.Message,
     m.Created_at
   FROM Message_Entry AS m
   JOIN Registered_User AS u
     ON m.Sender_id = u.User_id
   WHERE
     u.Email = ?
     AND m.Receiver_id = ?
   ORDER BY m.Created_at ASC;`,
      [senderID, receiverID]
    );

    // console.log("req.sender:" + req.params.senderID);
    // console.log("req.receiver:" + req.params.receiverID);

    res.json(rows);

  } catch (error) {
    console.error("Get conversation error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const getReceivedMessages = async (req, res) => {
  try {
    const { receiverID } = req.params;

    console.log("receiverid:"+ receiverID);

    // if (!receiverID) {
    //   return res.status(400).json({
    //     message: "Invalid user id"
    //   });
    // }

    var sql = `SELECT m.Message_id, sender.First_name, sender.Email, m.Message, m.Created_at FROM Message_Entry AS m
   JOIN Registered_User AS sender
     ON m.Sender_id = sender.User_id
	JOIN Registered_User AS receiver
    ON m.Receiver_id = receiver.User_id
   WHERE receiver.Email = ?
   ORDER BY m.Created_at ASC`;


    const [rows] = await pool.query(sql, [receiverID]);

    console.log("req.sender:" + req.params.receiverID);

    console.log("rows" +rows);

    res.json(rows);

  } catch (error) {
    console.error("Get conversation error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
}


export const getInbox = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `
      SELECT
        u.User_id AS user_id,
        u.First_name,
        u.Last_name,
        m.Message AS last_message,
        m.Created_at AS last_message_time
      FROM Message_Entry m
      JOIN Registered_User u
        ON u.User_id = CASE
          WHEN m.Sender_id = ? THEN m.Receiver_id
          ELSE m.Sender_id
        END
      WHERE m.Message_id IN (
        SELECT MAX(Message_id)
        FROM Message_Entry
        WHERE Sender_id = ? OR Receiver_id = ?
        GROUP BY
          LEAST(Sender_id, Receiver_id),
          GREATEST(Sender_id, Receiver_id)
      )
      ORDER BY m.Created_at DESC
      `,
      [userId, userId, userId]
    );

    res.json(rows);

  } catch (error) {
    console.error("Get inbox error:", error);
    res.status(500).json({ message: "Server error" });
  }
};