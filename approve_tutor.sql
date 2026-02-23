use tutoring_system_database;

select * from tutor_entry;

select * from course;

delete from Course where Course_id = 86;

select * from registered_user;

select * from Message_Entry;

drop table Message_Entry;

UPDATE Tutor_Entry
SET status = 'approved'
WHERE tutor_entry_id = 13 and status = 'pending';

delete from Tutor_Entry where tutor_entry_id = 6;

SELECT
     m.Message_id,
     m.Sender_id,
     m.Receiver_id,
     m.Message,
     m.Created_at,
     u.User_id,
     u.First_name,      -- example extra fields
     u.Email
   FROM Message_Entry AS m
   JOIN Registered_User AS u
     ON m.Receiver_id = u.User_id
   WHERE
     m.Sender_id = 27
     AND m.Receiver_id = 3
   ORDER BY m.Created_at ASC;
   
   insert into Message_Entry (sender_id, receiver_id, message) values (2, 27, "Received Message from server");

SELECT
     m.Message_id,
     u.First_name,   
     m.Message,
     m.Created_at
   FROM Message_Entry AS m
   JOIN Registered_User AS u
     ON m.Sender_id = u.User_id,

   WHERE
     m.Receiver_id = 27
   ORDER BY m.Created_at ASC;
   
   SELECT
     m.Message_id,
     u.First_name,   
     m.Message,
     m.Created_at
   FROM Message_Entry AS m
   JOIN Registered_User AS u
     ON m.Sender_id = u.User_id
   WHERE
     u.Email = 'anu@sfsu.edu'
     AND m.Receiver_id = 2
   ORDER BY m.Created_at ASC;
   
   SELECT
     m.Message_id,
     sender.First_name,   
     sender.Email,
     m.Message,
     m.Created_at
   FROM Message_Entry AS m
   JOIN Registered_User AS sender
     ON m.Sender_id = sender.User_id
	JOIN Registered_User AS receiver
    ON m.Receiver_id = receiver.User_id
   WHERE receiver.Email = 'anu@sfsu.edu'
   ORDER BY m.Created_at ASC;

