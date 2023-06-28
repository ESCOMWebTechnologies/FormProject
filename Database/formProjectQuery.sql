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
CREATE TABLE forms (
    id CHAR(16) UNIQUE NOT NULL,
    formName CHAR(255) NOT NULL,
    questionNumber INT NOT NULL DEFAULT 1,
    creationDate DATE,
    userId INT NOT NULL,
    answerNumber INT DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT FK_form_forms FOREIGN KEY (userId) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE question (
    id CHAR(16) UNIQUE NOT NULL,
    formId CHAR(16) NOT NULL,
    value INT NOT NULL,
    sourcePath CHAR(255),
    question CHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_question_form FOREIGN KEY (formId) REFERENCES forms(id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE answer (
    id CHAR(16) UNIQUE NOT NULL,
    userId INT NOT NULL,
    questionId CHAR(255) NOT NULL,
    answer TEXT,
    responseDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    value int default 0,
    PRIMARY KEY (id),
    CONSTRAINT FK_answer_user FOREIGN KEY (userId) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_answer_question FOREIGN KEY (questionId) REFERENCES question(id) ON UPDATE CASCADE ON DELETE CASCADE
);


select * from question