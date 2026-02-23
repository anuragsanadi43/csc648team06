-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Tutoring_System_Database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Tutoring_System_Database` DEFAULT CHARACTER SET utf8 ;
USE `Tutoring_System_Database` ;

-- drop database Tutoring_System_Database;
-- -----------------------------------------------------
-- Table Registered_User
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Registered_User` (
  `User_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `First_name` VARCHAR(45) NOT NULL,
  `Last_name` VARCHAR(45) NOT NULL,
  `Major` VARCHAR(45) NULL,
  `Minor` VARCHAR(45) NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Phone_number` VARCHAR(20) NULL,
  `Bio` TEXT NULL,
  `Portrait_path` VARCHAR(255) NULL,
  PRIMARY KEY (`User_id`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table Subject
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Subject` (
  `Subject_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Subject_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Subject_id`),
  UNIQUE INDEX `Subject_name_UNIQUE` (`Subject_name` ASC)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table Course
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Course` (
  `Course_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Class_num` VARCHAR(100) NOT NULL,
  `Course_name` VARCHAR(100) NOT NULL,
  `subject_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Course_id`),
  CONSTRAINT `FK_Course_Subject`
    FOREIGN KEY (`subject_id`)
    REFERENCES `Subject` (`Subject_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table Tutor_Entry
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Tutor_Entry` (
  `tutor_entry_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tutor_ID` INT UNSIGNED NOT NULL,
  `course_id` INT UNSIGNED NOT NULL,
  `cv_path` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`tutor_entry_id`),
  INDEX `FK_TutorEntry_User_idx` (`tutor_ID` ASC),
  INDEX `FK_TutorEntry_Course_idx` (`course_id` ASC),
  CONSTRAINT `FK_TutorEntry_User`
    FOREIGN KEY (`tutor_ID`)
    REFERENCES `Registered_User` (`User_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_TutorEntry_Course`
    FOREIGN KEY (`course_id`)
    REFERENCES `Course` (`Course_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table User_Course
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User_Course` (
  `User_id` INT UNSIGNED NOT NULL,
  `Course_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`User_id`, `Course_id`),
  INDEX `FK_UserCourse_Course_idx` (`Course_id` ASC),
  CONSTRAINT `FK_UserCourse_RegisteredUser`
    FOREIGN KEY (`User_id`)
    REFERENCES `Registered_User` (`User_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_UserCourse_Course`
    FOREIGN KEY (`Course_id`)
    REFERENCES `Course` (`Course_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table Message_Entry
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Message_Entry` (
  `Message_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Sender_id` INT UNSIGNED NOT NULL,
  `Receiver_id` INT UNSIGNED NOT NULL,
  `Message` MEDIUMTEXT NOT NULL,
  `Created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Message_id`),
  INDEX `FK_Message_Sender_idx` (`Sender_id` ASC),
  INDEX `FK_Message_Receiver_idx` (`Receiver_id` ASC),
  CONSTRAINT `FK_Message_Sender`
    FOREIGN KEY (`Sender_id`)
    REFERENCES `Registered_User` (`User_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_Message_Receiver`
    FOREIGN KEY (`Receiver_id`)
    REFERENCES `Registered_User` (`User_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table Tutor_Availability
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Tutor_Availability` (
  `availability_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tutor_entry_id` INT UNSIGNED NOT NULL,
  `day_of_week` TINYINT UNSIGNED NOT NULL, 
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`availability_id`),
  INDEX `FK_Availability_TutorEntry_idx` (`tutor_entry_id` ASC),
  CONSTRAINT `FK_Availability_TutorEntry`
    FOREIGN KEY (`tutor_entry_id`)
    REFERENCES `Tutor_Entry` (`tutor_entry_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `CHK_Availability_Time`
    CHECK (`start_time` < `end_time`)
) ENGINE=InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
