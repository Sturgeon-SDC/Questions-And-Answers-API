DROP DATABASE IF EXISTS questionsandanswers;

CREATE DATABASE questionsandanswers;

\c questionsandanswers;

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (

  id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  epoch_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  question_helpfulness INTEGER NOT NULL DEFAULT 0,
  reported INTEGER DEFAULT 0,
  date TIMESTAMPTZ NOT NULL DEFAULT current_timestamp

);

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (

  id SERIAL PRIMARY KEY,
  question_id INTEGER,
  body VARCHAR(1000),
  epoch_date BIGINT NOT NULL,
  answerer_name VARCHAR(60),
  answerer_email VARCHAR(60),
  helpfulness INTEGER DEFAULT 0,
  reported INTEGER DEFAULT 0,
  date TIMESTAMPTZ NOT NULL DEFAULT current_timestamp

);

CREATE TABLE photos (

  id SERIAL PRIMARY KEY,
  answer_id INTEGER,
  url VARCHAR(12000)

);

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (id);
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);

\COPY questions (id, product_id, question_body, epoch_date, asker_name, asker_email, question_helpfulness, reported) from '/Users/blakehughes/Desktop/SDC/questions.csv' DELIMITER ',' CSV HEADER;

UPDATE questions SET date = to_timestamp(floor(epoch_date / 1000));
ALTER TABLE questions DROP COLUMN epoch_date;

\COPY answers (id, question_id, body, epoch_date, answerer_name, answerer_email, helpfulness, reported) from '/Users/blakehughes/Desktop/SDC/answers.csv' DELIMITER ',' CSV HEADER;

UPDATE answers SET date = to_timestamp(floor(epoch_date / 1000));
ALTER TABLE answers DROP COLUMN epoch_date;

\COPY photos (id, answer_id, url) from '/Users/blakehughes/Desktop/SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;

