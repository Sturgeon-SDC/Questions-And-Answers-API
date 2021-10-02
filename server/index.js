const express = require('express');
const app = express();
const port = 3030;
const cors = require('cors');
const { pool } = require('../database/index.js');

app.use(express.json());
app.use(cors());

//  routes -----------------------------------------------------

//  questions ----------------------------------

app.get('/qa/questions/:product_id', (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  res.send('Results of Questions Get Req');
});

app.post('/qa/questions', (req, res) => {
  console.log(req.body);
  res.status(201).send('post question');
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.status(204).send();
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  res.status(204).send();
});

//  answers ----------------------------------

app.get('/qa/questions/:question_id/answers', (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  res.send('Results of Answers Get Req');
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.status(201).send();
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.status(204).send();
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.status(204).send();
});

//  local host ----------------------------------

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});