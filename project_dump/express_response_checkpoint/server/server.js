const express = require('express');
const morgan = require('morgan');
const PLAYSTORE = require('./playstore');

const app = express();

// Validators
const paramValidation =
  ('/apps',
  (req, res, next) => {
    const { sort, genres } = req.query;

    if (sort && sort !== 'Rating' && sort !== 'App') {
      return res.status(400).json("Sort must be 'Rating' or 'App'!");
    }

    const allowedGenres = [
      'Action',
      'Puzzle',
      'Strategy',
      'Casual',
      'Arcade',
      'Card'
    ];
    if (genres && !allowedGenres.includes(genres)) {
      return res.status(400).json(`Genres must be one of: ${allowedGenres}`);
    }

    next();
  });

// Handlers
const appsHandlers = {
  handleSort: (sort, results) => {
    results = results.sort((a, b) => {
      let curr = a[sort];
      let next = b[sort];
      if (sort === 'App') {
        curr = curr.toLowerCase();
        next = next.toLowerCase();
      }
      if (curr === next) return 0;
      if (sort === 'App') {
        return curr < next ? -1 : 1;
      } else return curr > next ? -1 : 1; // Rating high to low
    });
    return results;
  },
  handleGenres: (genres, results) => {
    results = results.filter(app => app.Genres.includes(genres));
    return results;
  }
};

app.use(morgan('dev'));
app.use(paramValidation);

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  const { handleSort, handleGenres } = appsHandlers;
  let results = [...PLAYSTORE];

  if (sort) results = handleSort(sort, results);
  if (genres) results = handleGenres(genres, results);

  res.json(results);
});

app.listen(8000, () => {
  console.log('Loading . . . Running on http://localhost:8000/');
});

// module.exports = app;

module.exports = {
  paramValidation,
  appsHandlers
};
