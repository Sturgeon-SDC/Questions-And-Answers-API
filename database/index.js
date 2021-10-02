const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: config.password,
  port: 3000,
});

//  queries ------------------------------------------------------------

//  get questions ----------------------------------
const getAllQuestions = () => {

  const queryString = 'QUERY STRING';
  const params = ;

  pool.query(queryString, params, (err, questionsResData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, questionsResData);
    }
  });

};

//  add questions ----------------------------------



//  get answers ----------------------------------
const getAllAnswers = () => {

  const queryString = 'QUERY STRING';
  const params = ;

  pool.query(queryString, params, (err, answersResData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, answersResData);
    }
  });

};

//  add answers ----------------------------------



//  --------------------------------------------------------------------

//  exports ---------------------------------------

module.exports = {
  pool
};

