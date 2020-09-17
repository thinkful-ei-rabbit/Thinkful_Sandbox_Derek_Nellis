const app = require('../server');
const supertest = require('supertest');
const { expect } = require('chai');

describe.skip('/apps route', () => {
  // Happy paths
  it('loads without params', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const app = res.body[0].App;
        expect(app).to.exist;
      });
  });

  it('loads with "sort" param', () => {
    const sort = 'App';

    return supertest(app)
      .get('/apps')
      .query({ sort })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const app = res.body[0].App;
        let sorted = true;

        expect(app).to.exist;
        if (res.body.length > 1) {
          sorted = app < res.body[1].App;
        }
        expect(sorted).to.be.true;
      });
  });

  it('loads with "genres" param', () => {
    const genres = 'Action';

    return supertest(app)
      .get('/apps')
      .query({ genres })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const app = res.body[0];
        let filtered = true;

        expect(app).to.exist;
        res.body.forEach(app => (filtered = app.Genres.includes('Action')));
        expect(filtered).to.be.true;
      });
  });

  it('loads with "sort" and "genres" param', () => {
    const query = {
      sort: 'App',
      genres: 'Action'
    };

    return supertest(app)
      .get('/apps')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const app = res.body[0];
        let checker = true;

        expect(app).to.exist;
        if (res.body.length > 1) {
          sorted = app < res.body[1].App;
        }
        res.body.forEach(app => (checker = app.Genres.includes('Action')));
        expect(checker).to.be.true;
      });
  });

  // Validation prevents sad paths
});
