import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../app';
import { runQuery } from '../db';
import Helper from '../src/middleware/Helper';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/auth';

describe('AUTH CONTROLLER', () => {
  beforeEach(async () => {
    const delUser = 'DELETE FROM users WHERE email = $1';
    const createUser = 'INSERT INTO users(email, first_name, last_name, password, is_admin) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const hashedpassword = Helper.hashPassword('@dminTest');
    const values = ['test@wayfarer.cd', 'Test', 'Last', hashedpassword, false];

    await runQuery(delUser, ['sarah.test@gmail.rw']);
    await runQuery(delUser, ['test@wayfarer.cd']);
    await runQuery(createUser, values);


  });

  describe('/POST SIGN UP', () => {
    const signupUrl = `${baseUrl}/signup`;
    it('should register a new user', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'sarah.test@gmail.rw',
          first_name: 'Sarah',
          last_name: 'Lifaefi',
          password: 'usr$_18@',
        })
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('first_name');
          expect(res.body.data).to.have.property('last_name');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('is_admin');
          done();
        });
    });

    it('should not register a user with empty first_name or last_name', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'sarah@gmail.com',
          first_name: '', // empty name
          last_name: 'Lifaefi',
          password: 'usr$_18@',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success');
          done();
        });
    });

    it('should not register a user with invalid first_name or last_name', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'sarah@gmail.com',
          first_name: 'Sarah',
          last_name: '*Lifaefi$#', // invalid name
          password: 'usr$_18@',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success').to.be.equal(false);
          done();
        });
    });

    it('should not register a user with short first_name or last_name', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'sarah@gmail.com',
          first_name: 'Sarah',
          last_name: 'L', // name must be at least 2 ccharactors
          password: 'usr$_18@',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success').to.be.equal(false);
          done();
        });
    });

    it('should not register a user with invalid email', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'sarahgmail.com', // invalid email
          first_name: 'Sarah',
          last_name: 'Lifaefi',
          password: 'usr$_18@',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success').to.be.equal(false);
          done();
        });
    });

    it('should not register a user with empty email field', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: '', // no email provided
          first_name: 'Sarah',
          last_name: 'Lifaefi',
          password: 'usr$_18@',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success').to.be.equal(false);
          done();
        });
    });

    it('should not register a user with same email twice', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'test@wayfarer.cd', // email already exists
          first_name: 'Test',
          last_name: 'Last',
          password: '@dminTest',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success').to.be.equal(false);
          done();
        });
    });

    it('should not register a user with password less than 8 characters', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'sarah@gmail.com',
          first_name: 'Sarah',
          last_name: 'Lifaefi',
          password: 'usr$_18', // password.length < 8
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success').to.be.equal(false);
          done();
        });
    });

    it('should not register a user with empty password field', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'sarah@gmail.com',
          first_name: 'Sarah',
          last_name: 'Lifaefi',
          password: '', // empty password
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success').to.be.equal(false);
          done();
        });
    });

    /*it('should not register a user with a weak password', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'sarah@gmail.com',
          first_name: 'Sarah',
          last_name: 'Lifaefi',
          password: 'abellifa', // weak password
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success').to.be.equal(false);
          done();
        });
    });*/
  });

  describe('/POST SIGN IN', () => {
    const signinUrl = `${baseUrl}/signin`;

    it('should login the user and retrieve the token', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'test@wayfarer.cd',
          password: '@dminTest',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('token');
          //expect(res.body.data.token).to.not.be.empty;
          done();
        });
    });

    it('should not sign in a user with invalid email address', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'usr.pm.com',
          password: 'usr$_18@',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          //expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should not sign in a user with empty email address', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: '',
          password: 'usr$_18@',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          //expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should not sign in a user with empty password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'usr@pm.com',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          //expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should not sign in a user with non existing email', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'ma2@pm.com',
          password: 'usr$_18@',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          //expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should not sign in a user with existing email and wrong password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'sarah.test@gmail.com', //valid email
          password: 'usr$_18pp@', //wrong password
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          //expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
