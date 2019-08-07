import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

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
});
