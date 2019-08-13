import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1';

describe('/GET TRIPS', () => {
  it('should respond with 200 and return a list of all trips', (done) => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluLnRlc3RAd2F5ZmFyZXIuY2QiLCJpYXQiOjE1NjU3Mjc3MzN9.ngAoJHOefRps0oPT3bs5dfpoXN_hWXFiiHAGqhP5SYs';
    chai.request(app)
      .get(`${baseUrl}/trips`)
      .set('token', validToken)
      .end((err, res) => {
        console.log("response: ", res.body)
        console.log("Token ", validToken);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
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
  it('it should return error 400 if no token is provided', (done) => {
    chai.request(app).post(`${baseUrl}/trips`)
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

    chai.request(app).post(`${baseUrl}/trips`)
      .set('token', inValidToken)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        console.log(err.message);
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
      .catch((err) => {
        console.log(err.message);
        done()
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
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
