const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Goodbye Express!');
});

app.get('/quotient', (req, res) => {
  const { a, b } = req.query;

  if (!a) {
    return res.status(400).send('Value for a is needed');
  }

  if (!b) {
    return res.status(400).send('Value for b is needed');
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA)) {
    return res.status(400).send('Value for a must be numeric');
  }

  if (isNaN(numB)) {
    return res.status(400).send('Value for b must be numeric');
  }

  if (numB == 0) {
    return res.status(400).send('Cannot divide by 0');
  }

  const ans = numA / numB;

  res.send(`${a} divided by ${b} is ${ans}`);
});

module.exports = app;
