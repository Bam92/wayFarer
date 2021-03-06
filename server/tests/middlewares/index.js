import chaiHttp from 'chai-http';
import chai from 'chai';

import Helper from '../../src/middleware/Helper';

const { expect } = chai;
chai.use(chaiHttp);

describe('Middleware tests', () => {
  it('Helper.hashPassword should exists', () => {
    expect(Helper.hashPassword).to.be.a('function');
  });

  it('Helper.comparePassword should exists', () => {
    expect(Helper.comparePassword).to.be.a('function');
  });

  it('Helper.generateToken should exists', () => {
    expect(Helper.generateToken).to.be.a('function');
  });

  it('Helper.isValidEmail should exists', () => {
    expect(Helper.isValidEmail).to.be.a('function');
  });

  it('Helper.isValidPassword should exists', () => {
    expect(Helper.isValidPassword).to.be.a('function');
  });

  it('Helper.isValidString should exists', () => {
    expect(Helper.isValidEmail).to.be.a('function');
  });

});
