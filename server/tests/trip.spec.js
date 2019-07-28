import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/';

describe ('/GET TRIPS', () => {
  it('getTrips() should respond with 201 and return a list of all trips', (done) => {
    chai.request(app)
      .get(`${baseUrl}trips`)
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
});
