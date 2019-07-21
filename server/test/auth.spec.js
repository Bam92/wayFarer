import chaiHttp from 'chai-http';
import chai from 'chai';
//import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const signInUrl = '/api/v1/auth/signin';

describe('/POST SIGN IN', () => {
  it('should sign in a user with valid credential', (done) => {
    chai.request(app)
      .post(signInUrl)
      .send({
        email: 'usr@pm.com',
        password: 'usr$_18@',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('user_id');
        expect(res.body.data).to.have.property('first_name');
        expect(res.body.data).to.have.property('last_name');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('is_admin');
        done();
      });
  });

  it('should not sign in a user with invalid email address', (done) => {
    chai.request(app)
      .post(signInUrl)
      .send({
        email: 'usr.pm.com',
        password: 'usr$_18@',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not sign in a user with empty password', (done) => {
    chai.request(app)
      .post(signInUrl)
      .send({
        email: 'usr@pm.com',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not sign in a user with login or password', (done) => {
    chai.request(app)
      .post(signInUrl)
      .send({
        email: 'usr@pm.com',
        password: 'usr$_18',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
