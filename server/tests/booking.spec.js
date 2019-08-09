import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import { verifyToken, verifyAdmin, generateToken } from '../src/middleware/middlewares';
//import privateKey from '../config';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1';

describe('Bookings controller', () => {
  describe('GET user bookings', () => {
    it('it should return error 401 if no valid token is provided', (done) => {
      chai.request(app).get(`${baseUrl}/bookings`)
      .set('Authorization', '')
      .then(res => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.equal('No token provided');
        done();
      }).catch(err => {
        console.log(err.message);
      });;
    });

   /* it('Should return with status 200 and user bookings if valid token is provided', (done) => {
      //let mock login to get token
      const user = {
        'email': 'sarah@gmail.com',
        'password': 'usr$_18@',
      }
      // then send a signin request to receive the token
      chai.request(app).post(`${baseUrl}/auth/signin`)
      .send(user)
      .then((login_response) => {
        //add token to next request Authorization header as Bearer token
        const token = `${login_response.body.token}`;
        chai.request(app).get(`${baseUrl}/bookings`)
        .set('x-access-token', token)
        .then(protected_response => {
          // proceed with assertions here
          expect(protected_response).to.have.status(200);
          expect(protected_response.body).to.be.an('object');
          done();
        });
      });
    });*/

  });

  describe('GET user bookings', () => {
    it('it should return error 401 if no valid token is provided', (done) => {
      chai.request(app).delete(`${baseUrl}/bookings/:id`)
      .set('Authorization', '')
      .then(res => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.equal('No token provided');
        done();
      }).catch(err => {
        console.log(err.message);
      });;
    });

  });

});
