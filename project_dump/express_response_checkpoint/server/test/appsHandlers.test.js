const { expect } = require('chai');
const { appsHandlers } = require('../server');
const STORE = require('./mockData');

describe('appsHandlers functions', () => {
  const { handleSort, handleGenres } = appsHandlers;
  const mockData = [...STORE];
  const sortParams = ['App', 'Rating'];
  const genresParams = [
    'Action',
    'Puzzle',
    'Strategy',
    'Casual',
    'Arcade',
    'Card'
  ];

  // Happy paths
  sortParams.map(sort => {
    it(`sorts ${sort}s with handleSort`, () => {
      const expected = mockData.reduce(
        (acc, app) => {
          if (sort === 'App') return (acc = app[sort] < acc[sort] ? app : acc);
          else return (acc = app[sort] > acc[sort] ? app : acc);
        },
        { App: 'Z', Rating: 1 }
      );
      const mockSort = handleSort(sort, mockData);

      expect(mockSort[0]).to.eql(expected);
    });
  });

  genresParams.map(genres => {
    it(`filters ${genres} with handleGenres`, () => {
      const mockFilter = handleGenres(genres, mockData);

      expect(mockFilter.length).to.eql(1);
      expect(mockFilter[0].Genres).to.include(genres);
    });
  });

  // Validation prevents sad paths
});
