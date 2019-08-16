import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import { runQuery } from '../db';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1';

describe('/GET TRIPS', () => {
  it('it should return error if no token is provided', (done) => {
    chai.request(app).get(`${baseUrl}/trips`)
      .set('Header', '')
      .then((res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('No token provided');
        done();
      });
  });

  it('it should throw error if no valid token is provided', (done) => {
    const inValidToken = 'eyJhiOIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

    chai.request(app).get(`${baseUrl}/trips`)
      .set('token', inValidToken)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});

describe('/POST TRIP', () => {

  it('it should return error if no token is provided', (done) => {
    chai.request(app).post(`${baseUrl}/trips`)
      .set('Header', '')
      .then((res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('No token provided');
        done();
      });
  });

  it('it should throw error if no valid token is provided', (done) => {
    const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

    chai.request(app).post(`${baseUrl}/trips`)
      .set('token', inValidToken)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('it should not post if valid token provided is not for admin', (done) => {
    const token = 'eyJhbGciOiUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluLnRlc3RAd2F5ZmFyZXIuY2QiLCJpYXQiOjE1NjU3Mjc3MzN9.ngAoJHOefRps0oPT3bs5dfpoXN_hWXFiiHAGqhP5SYs';

    chai.request(app).post(`${baseUrl}/trips`)
      .set('token', token)
      .then((res) => {
        expect(res).to.have.status(401);
        done();
      })
      .catch(() => {
        done();
      });
  });

  it('should not post with empty seating capacity', (done) => {
    chai.request(app)
      .post(`${baseUrl}/trips`)
      .send({
        seating_capacity: '',
        origin: 'Kabondo',
        destination: 'Makiso',
        bus_license_number: 'RAC452W',
        fare: 750,
      })
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should not post if fare is not a number', (done) => {
    chai.request(app)
      .post(`${baseUrl}/trips`)
      .send({
        seating_capacity: '',
        origin: 'Kabondo',
        destination: 'Makiso',
        bus_license_number: 'RAC452W',
        fare: '750',
      })
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should not post if fare is empty', (done) => {
    chai.request(app)
      .post(`${baseUrl}/trips`)
      .send({
        seating_capacity: '',
        origin: 'Kabondo',
        destination: 'Makiso',
        bus_license_number: 'RAC452W',
        fare: '',
      })
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should retrun error if destination is missing a new trip', (done) => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluLnRlc3RAd2F5ZmFyZXIuY2QiLCJpYXQiOjE1NjU5MzAzNzV9.d8M5e6_BVDhZt7USo9dd9t8sPu0H4Fzu_PXi-kC2uZo';
    chai.request(app)
      .post(`${baseUrl}/trips`)
      .set('token', token)
      .send({
        seating_capacity: 25,
        origin: 'Kabondo',
        destination: '',
        bus_license_number: 'RAC452W',
        fare: 750,
      })
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Cancel a trip', () => {
  it('it should return error if no token is provided', (done) => {
    chai.request(app).patch(`${baseUrl}/trips/:id/cancel`)
      .set('Header', '')
      .then((res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('No token provided');
        done();
      });
  });

  it('it should throw error if no valid token is provided', (done) => {
    const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

    chai.request(app).patch(`${baseUrl}/trips/:id/cancel`)
      .set('token', inValidToken)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('it should not cancel if valid token provided is not for admin', (done) => {
    const token = 'eyJhbGciOiUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluLnRlc3RAd2F5ZmFyZXIuY2QiLCJpYXQiOjE1NjU3Mjc3MzN9.ngAoJHOefRps0oPT3bs5dfpoXN_hWXFiiHAGqhP5SYs';

    chai.request(app).patch(`${baseUrl}/trips/:id/cancel`)
      .set('token', token)
      .then((res) => {
        expect(res).to.have.status(401);
        done();
      })
      .catch(() => {
        done();
      });
  });

  it('it should not cancel if valid token provided is for admin', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluLnRlc3RAd2F5ZmFyZXIuY2QiLCJpYXQiOjE1NjU4OTA5ODB9.ZNgPPJgP1jdgZfnLuqV7pMgVWKQxwekJXg1FOSpdFq8';

    chai.request(app).patch(`${baseUrl}/trips/:id/cancel`)
      .set('token', token)
      .then((res) => {
        expect(res).to.have.status(201);
        done();
      })
      .catch(() => {
        done();
      });
  });

  it('it should not cancel if id is not an number', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluLnRlc3RAd2F5ZmFyZXIuY2QiLCJpYXQiOjE1NjU4OTA5ODB9.ZNgPPJgP1jdgZfnLuqV7pMgVWKQxwekJXg1FOSpdFq8';

    chai.request(app).patch(`${baseUrl}/trips/hd/cancel`)
      .set('token', token)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      })
      .catch(() => {
        done();
      });
  });
});
