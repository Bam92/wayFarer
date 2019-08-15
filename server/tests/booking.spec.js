import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1';

describe('Bookings controller', () => {

  describe('POST bookings', () => {
    it('it should throw error if no valid token is provided', (done) => {
      const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

      chai.request(app).post(`${baseUrl}/bookings`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
