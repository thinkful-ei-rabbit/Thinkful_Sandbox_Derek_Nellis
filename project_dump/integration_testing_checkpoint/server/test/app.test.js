const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('app GET /', () => {
  it('should return a message from GET /', () => {
    return supertest(app).get('/').expect('Goodbye Express!');
  });
});

describe('app GET /quotient', () => {
  it('8/4 should be 2', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 8, b: 4 })
      .expect(200, '8 divided by 4 is 2');
  });

  it(`should return 400 if 'a' is missing`, () => {
    return supertest(app)
      .get('/quotient')
      .query({ b: 4 })
      .expect(400, 'Value for a is needed');
  });
});

describe('app GET /generate', () => {
  it('should generate an array of 5', () => {
    return supertest(app)
      .get('/generate') // invoke the endpoint
      .query({ n: 5 }) // send the query string ?n=5
      .expect(200) // assert that you get a 200  OK status
      .expect('Content-Type', /json/)
      .then(res => {
        // make sure you get an array
        expect(res.body).to.be.an('array');
        // array must not be empty
        expect(res.body).to.have.lengthOf.at.least(1);
        // this assertion fails
        expect(res.body).to.have.members([1, 2, 3, 4, 5]);
      });
  });
});

describe('app GET /midpoint endpoint', () => {
  it('should find midpoint between NY and LA', () => {
    const query = {
      lat1: 40.6976701, //NY
      lon1: -74.2598674, //NY
      lat2: 34.0207305, //LA
      lon2: -118.6919221 //LA
    };

    // somewhere near Aurora, Kansas
    const expected = {
      lat: 39.50597300917347,
      lon: -97.51789156106972
    };

    return supertest(app)
      .get('/midpoint')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.all.keys('lat', 'lon');
        expect(res.body).to.eql(expected);
      });
  });
});

describe('app GET /frequency', () => {
  it('happyPath', () => {
    const query = {
      s: 'aaBBAAbbaa'
    };

    const expected = {
      unique: 2,
      average: 5,
      highest: 'a',
      a: 6,
      b: 4
    };

    return supertest(app)
      .get('/frequency')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.all.keys(
          'unique',
          'average',
          'highest',
          'a',
          'b'
        );
        expect(res.body).to.eql(expected);
      });
  });

  it('happyPath with equal letters', () => {
    const query = {
      s: 'aaBBAAbb'
    };

    const expected = {
      unique: 2,
      average: 4,
      highest: 'a',
      a: 4,
      b: 4
    };

    return supertest(app)
      .get('/frequency')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.all.keys(
          'unique',
          'average',
          'highest',
          'a',
          'b'
        );
        expect(res.body).to.eql(expected);
      });
  });

  it('sadPath', () => {
    return supertest(app)
      .get('/frequency')
      .query(null)
      .expect(400, 'Invalid request');
  });
});
