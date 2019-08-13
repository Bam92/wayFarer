import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
//import { verifyToken, verifyAdmin, generateToken } from '../src/middleware/middlewares';
//import privateKey from '../config';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1';
/*
describe ('/GET TRIPS', () => {
  it('getTrips() should respond with 201 and return a list of all trips', (done) => {
    chai.request(app)
      .get(`${baseUrl}/trips`)
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('seating_capacity');
        expect(res.body.data[0]).to.have.property('origin');
        expect(res.body.data[0]).to.have.property('destination');
        expect(res.body.data[0]).to.have.property('trip_date');
        expect(res.body.data[0]).to.have.property('fare');
        expect(res.body.data[0]).to.have.property('status');
        done();
      });
  });
  it('getTrip() should respond with 201 and return detail of a given trip', (done) => {
    chai.request(app)
      .get(`${baseUrl}trips/1`)
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object')
          .that.includes.all.keys(['id', 'seating_capacity', 'origin', 'destination', 'trip_date', 'fare', 'status']);
        done();
      });
  });
  it('getTrip() should respond with 404 and return an error message if :id !== integer', (done) => {
    chai.request(app)
      .get(`${baseUrl}trips/nonExistingId`)
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res).to.have.status(404);
        expect('Trip not found');
        if (err) return done(err);
        done();
      });
  });
});*/

describe ('/POST TRIP', () => {
/*  it('admin should create a new trip', (done) => {
    chai.request(app)
      .post(`${baseUrl}trip`)
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('seating_capacity');
        expect(res.body.data[0]).to.have.property('origin');
        expect(res.body.data[0]).to.have.property('destination');
        expect(res.body.data[0]).to.have.property('trip_date');
        expect(res.body.data[0]).to.have.property('fare');
        expect(res.body.data[0]).to.have.property('status');
        done();
      });
  });
*/
  it('it should return error 400 if no token is provided', (done) => {
      chai.request(app).post(`${baseUrl}/trips`)
      .set('Header', '')
      .then(res => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.equal('No token provided');
        done();
      }).catch(err => {
        console.log(err.message);
      });;
    });

    it('it should throw error if no valid token is provided', (done) => {
      const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

      chai.request(app).post(`${baseUrl}/trips`)
      .set('token', inValidToken)
      .then(res => {
        expect(res).to.have.status(400);
        //expect(res.body).to.be.an('object');
        done();
      }).catch(err => {
        console.log(err.message);
      });;
    });
});

