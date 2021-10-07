const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "questionsandanswers",
  password: config.password,
  port: 5432,
});

pool.connect()
    .then(() => {
      console.log('Connected to Blake\'s database!')
    })
    .catch(() => {
      console.log('Failed connecting to Blake\'s database')
    });

//  NOTES  ------------------------------------------------------------
//  *ARRAY_AGG
//  *BE SURE TO CALL QUERY FUNCTIONS WITH PROVIDED PARAMS
//  *CONSIDER USING ASYNC AWAIT

//  QUERIES ------------------------------------------------------------

//  get questions ----------------------------------
const getAllQuestions = (pId, callback) => {

  const queryString = 'SELECT * FROM questions WHERE product_id = $1 ORDER BY question_helpfulness DESC';
  // remember params are in an array
  const params = [pId];

  pool.query(queryString, params, (err, questionsResData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, questionsResData);
    }
  });

};

//  add questions ----------------------------------
const addNewQuestion = (pId, body, name, email, callback) => {

  const queryString = 'INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES ($1, $2, $3, $4)';
  const params = [pId, body, name, email];

  pool.query(queryString, params, (err, successfulQuestionAddition) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, successfulQuestionAddition);
    }
  });

};

//  get answers ----------------------------------
const getAllAnswers = (qId, callback) => {

  const queryString = 'SELECT answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness, ARRAY_AGG (url) AS photos FROM answers LEFT OUTER JOIN photos ON answers.id = photos.answer_id WHERE answers.question_id = $1 GROUP BY answers.id ORDER BY answers.helpfulness DESC';
  const params = [qId];

  pool.query(queryString, params, (err, answersResData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, answersResData);
    }
  });

};

//  add answers ----------------------------------
const addNewAnswer = (qId, body, name, email, photos, callback) => {

  const queryString = 'INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4) RETURNING id';
  const params = [qId, body, name, email];

  pool.query(queryString, params, (err, successfulAnswerAddition) => {
    if (err) {
      callback(err, null);
    } else {
      const aId = successfulAnswerAddition.rows[0].id;

      if (photos.length > 0) {
        photos.forEach((photo) => {

          const photoQueryString = 'INSERT INTO photos (answer_id, url) VALUES ($1, $2)';
          const photoParams = [aId, photo];

          pool.query(photoQueryString, photoParams, (err, successfulPhotoAddition) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, successfulPhotoAddition);
            }
          });

        });
      }
      callback(null, successfulAnswerAddition);
    }
  });
};

//  --------------------------------------------------------------------

//  exports ---------------------------------------

module.exports = {
  pool,
  getAllQuestions,
  addNewQuestion,
  getAllAnswers,
  addNewAnswer
};

