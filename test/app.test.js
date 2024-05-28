// // test/server.test.js
// require('dotenv').config();
// const request = require('supertest');
// const sinon = require('sinon');
// const app = require('../server'); // Import the app from server.js

// describe('Express Server', () => {
//   let chai, expect;

//   before(async () => {
//     chai = await import('chai');
//     expect = chai.expect;
//     const connectDB = require('../config/db'); // Import the connectDB function
//     sinon.stub(connectDB, 'default').resolves(); // Stub the connectDB function
//   });

//   after(() => {
//     sinon.restore(); // Restore the original functionality
//   });

//   describe('GET /test', () => {
//     it('should return a test message', (done) => {
//       request(app)
//         .get('/test')
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.status).to.equal(200);
//           expect(res.body).to.have.property('message', 'test');
//           done();
//         });
//     });
//   });

//   describe('POST /api/auth/login', () => {
//     it('should handle login', (done) => {
//       request(app)
//         .post('/api/auth/login')
//         .send({ username: 'testuser', password: 'testpassword' }) // Adjust based on your actual input
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.status).to.equal(200);
//           // Add more assertions based on your login logic
//           done();
//         });
//     });
//   });

//   // Add more tests for other routes similarly
// });
