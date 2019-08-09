import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import bookingModel from '../src/models/booking.model';
import bookingData from '../src/db/booking';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1';

describe('App basic tests', () => {
  it('App should exists', () => {
    expect(app).to.be.a('function');
  });

  it('App returns 404 error for non existing routes', (done) => {
    chai.request(app).get('/undefined').then((res) => {
      expect(res).to.have.status(404);
      done();
    });
  });

  it('bookNow() should add data on booking db', () => {
    const add = bookingModel.bookNow(1, 'td93sm0jm9')
    expect(bookingData.length).to.be.equal(5);

  });
});
