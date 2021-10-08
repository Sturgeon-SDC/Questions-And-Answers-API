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

  id SERIAL NOT NULL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  epoch_date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  helpfulness INTEGER DEFAULT 0,
  reported INTEGER NOT NULL DEFAULT 0,
  date TIMESTAMPTZ NOT NULL DEFAULT current_timestamp

);

CREATE TABLE photos (

  id SERIAL NOT NULL PRIMARY KEY,
  answer_id INTEGER NOT NULL,
  url VARCHAR(12000) NOT NULL

);



ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE;
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id) ON DELETE CASCADE;



\COPY questions (id, product_id, question_body, epoch_date, asker_name, asker_email, question_helpfulness, reported) from '/Users/blakehughes/Desktop/SDC/questions.csv' DELIMITER ',' CSV HEADER;

--\COPY questions (id, product_id, question_body, epoch_date, asker_name, asker_email, question_helpfulness, reported) from '/home/ubuntu/data/questions.csv' DELIMITER ',' CSV HEADER;

UPDATE questions SET date = to_timestamp(floor(epoch_date / 1000));
ALTER TABLE questions DROP COLUMN epoch_date;
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions)+1);
-- LOOK INTO CREATING INDEXES
CREATE INDEX product_id_questions_index ON questions (product_id);


\COPY answers (id, question_id, body, epoch_date, answerer_name, answerer_email, helpfulness, reported) from '/Users/blakehughes/Desktop/SDC/answers.csv' DELIMITER ',' CSV HEADER;

--\COPY answers (id, question_id, body, epoch_date, answerer_name, answerer_email, helpfulness, reported) from '/home/ubuntu/data/answers.csv' DELIMITER ',' CSV HEADER;

UPDATE answers SET date = to_timestamp(floor(epoch_date / 1000));
ALTER TABLE answers DROP COLUMN epoch_date;
SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers)+1);
CREATE INDEX question_id_answers_index ON answers (question_id);

\COPY photos (id, answer_id, url) from '/Users/blakehughes/Desktop/SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;

--\COPY photos (id, answer_id, url) from '/home/ubuntu/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos)+1);
CREATE INDEX answer_id_photos_index ON photos (answer_id);

