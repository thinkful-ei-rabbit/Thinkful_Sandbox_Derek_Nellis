const app = require('../app');
const supertest = require('supertest');
const { expect } = require('chai');

// describe('GET /apps', () => {
//   it.todo('should return an array', () => {
//     return supertest(app)
//       .get('/apps')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .expect(res => {
//         expect(res.body).to.be.an('array');
//         expect(res.body[0]).to.be.an('object');
//         expect(res.body[0]).to.include.all.keys.keys('title', 'author', 'date');
//       });
//   });

//   it.todo('unHappy', () => {
//     return supertest(app)
//       .get('/apps')
//       .query({ sort: 'foo' })
//       .expect(400, { message: "Sort must be 'Rating' or 'App'!" });
//   });

//   it.todo('happy', () => {
//     return supertest(app)
//       .get('/apps')
//       .query({ sort: 'Rating' })
//       .expect(200)
//       .expect(res => {
//         expect(res.body).to.be.an('array');
//         let i = 0,
//           sorted = true;
//         while (sorted && i < res.body.length - 1) {
//           sorted = res.body[i].title < res.body[i + 1].title;
//           i++;
//         }
//       });
//   });
// });
