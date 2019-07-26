import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/';

describe ('/GET TRIPS', () => {
  it('should return all trips', (done) => {
    chai.request(app)
      .get(`${baseUrl}trips`)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('seating_capacity');
        expect(res.body.data).to.have.property('origine');
        expect(res.body.data).to.have.property('destination');
        expect(res.body.data).to.have.property('trip_date');
        expect(res.body.data).to.have.property('fare');
        expect(res.body.data).to.have.property('status');
        (done)
      });
  });
});
