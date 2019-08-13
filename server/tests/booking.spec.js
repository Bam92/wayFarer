import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1';

describe('Bookings controller', () => {
  describe('GET user bookings', () => {
    it('it should return error 401 if no token is provided', (done) => {
      chai.request(app).get(`${baseUrl}/bookings`)
        .set('Header', '')
        .then((res) => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.be.equal('No token provided');
          done();
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

    it('it should throw error if no valid token is provided', (done) => {
      const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

      chai.request(app).get(`${baseUrl}/bookings`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(403);
          done();
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

    describe('GET user bookings', () => {
      it('it should return error 401 if no valid token is provided', (done) => {
        const inValidToken = 'eyJhbGOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

        chai.request(app).delete(`${baseUrl}/bookings/:id`)
          .set('token', inValidToken)
          .then((res) => {
            expect(res).to.have.status(403);
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });
      });

      it('it should delete a booking', (done) => {
        const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

        chai.request(app).delete(`${baseUrl}/bookings/1`)
          .set('token', validToken)
          .then((res) => {
            expect(res).to.have.status(201);
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });
      });

      it('it should throw an error if id in not a number', (done) => {
        const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

        chai.request(app).delete(`${baseUrl}/bookings/d`)
          .set('token', validToken)
          .then((res) => {
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('ID must be a number');
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    });
  });
});
