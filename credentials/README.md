README.MD# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP 
    `3.133.58.251`
2. SSH username 
    `ubuntu`
3. SSH password or key.
     We are using an SSH **key pair**.  
   - The private key file is included in this folder as:  
     `team06-key.pem`  
   - Example SSH command:  
     ```bash
     ssh -i team06-key.pem ubuntu@3.133.58.251
     ```
4. Database URL or IP and port used.
    - Runs on the **same EC2 instance**  
    - Host: `127.0.0.1` (localhost)  
    - Port: `3306` (default MySQL port)
5. Database username
    `team06`
6. Database password
    `Summer2025!`  
   *(update if the password is changed during setup — must match `.env`)*
7. Database name (basically the name that contains all your tables)
    `Tutoring_System_Database`
8. Instructions on how to use the above information.
- **SSH into server**:  
     ```bash
     ssh -i team06-key.pem ubuntu@3.133.58.251
     ```  
   - **Access MySQL**:  
     ```bash
     mysql -u team06 -p
     # enter password when prompted
     USE team06db;
     SHOW TABLES;
     ```  
   - **Application access**:  
     - Frontend (React build): `http://3.133.58.251`  
     - API health check: `http://3.133.58.251/api/health`


# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.

