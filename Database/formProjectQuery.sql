DROP DATABASE IF EXISTS formProject;
CREATE DATABASE formProject;
USE formProject;
CREATE TABLE users(
	id INT AUTO_INCREMENT UNIQUE NOT NULL,
    username CHAR(150) NOT NULL UNIQUE,
    password CHAR(255) NOT NULL,
    name CHAR(150),
    surname CHAR(25) DEFAULT '',
    imagePath VARCHAR(350),
    CONSTRAINT PrimaryKeyUsers
    PRIMARY KEY (id,username)
);
ALTER TABLE users;
ALTER COLUMN name SET DEFAULT username; 