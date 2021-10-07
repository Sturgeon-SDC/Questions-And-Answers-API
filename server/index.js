const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const db = require('../database/index.js');

app.use(express.json());
app.use(cors());

//  routes -----------------------------------------------------
//  *LOOK AT LEGACY CODE TO GET PRECISE URL PATHS

//  questions ----------------------------------

app.get('/qa/:product_id', (req, res) => {

  const pId = req.params.product_id;

  db.getAllQuestions(pId, (err, questionsResData) => {
    if (err) {
      console.log('Failed getting questions from the server ---> ', err);
      res.status(404).send();
    } else {
      // console.log('Server response data ---> ', {
      //   product_id: pId,
      //   results: questionsResData.rows
      // })
      res.status(200).send({
        product_id: pId,
        results: questionsResData.rows
      });
    }
  });

});

app.post('/qa/:product_id', (req, res) => {

  const pId = req.params.product_id;
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;

  db.addNewQuestion(pId, body, name, email, (err, successfulQuestionAddition) => {
    if (err) {
      console.log('Failed posting a question from the server ---> ', err);
      res.status(404).send();
    } else {
      // console.log('Server response data ---> ', successfulQuestionAddition);
      res.status(201).send();
    }
  });

});

// app.put('/qa/questions/:question_id/helpful', (req, res) => {
//   res.status(204).send();
// });

// app.put('/qa/questions/:question_id/report', (req, res) => {
//   res.status(204).send();
// });

//  answers ----------------------------------

app.get('/qa/:question_id/answers', (req, res) => {

  const qId = req.params.question_id;

  db.getAllAnswers(qId, (err, answersResData) => {
    if (err) {
      console.log('Failed getting answers from the server ---> ', err);
      res.status(404).send();
    } else {
      // console.log('Server response data ---> ', answersResData.rows);
      res.status(200).send(answersResData.rows);
    }
  });

});

app.post('/qa/:question_id/answers', (req, res) => {

  const qId = req.params.question_id;
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos;

  db.addNewAnswer(qId, body, name, email, photos, (err, successfulAnswerAddition) => {
    if (err) {
      console.log('Failed posting an answer from the server ---> ', err);
      res.status(404).send();
    } else {
      // console.log('Server response data ---> ', successfulAnswerAddition);
      res.status(201).send();
    }
  });
});

// app.put('/qa/answers/:answer_id/helpful', (req, res) => {
//   res.status(204).send();
// });

// app.put('/qa/answers/:answer_id/report', (req, res) => {
//   res.status(204).send();
// });

//  local host ----------------------------------

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});