const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('User and Voucher API Tests', () => {
  let superUserToken, normalUserToken, voucherId;

  it('should register a super user', (done) => {
    chai.request(app)
      .post('/users')
      .send({ name: 'superuser', password: 'password123', balance: 1000 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should register a normal user', (done) => {
    chai.request(app)
      .post('/users')
      .send({ name: 'normaluser', password: 'password123', balance: 500 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should login as super user', (done) => {
    chai.request(app)
      .post('/users/login')
      .send({ name: 'superuser', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        superUserToken = res.body.token; // Assuming the login response includes a token
        done();
      });
  });

  it('should login as normal user', (done) => {
    chai.request(app)
      .post('/users/login')
      .send({ name: 'normaluser', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        normalUserToken = res.body.token; // Assuming the login response includes a token
        done();
      });
  });

  it('should create a voucher as super user', (done) => {
    chai.request(app)
      .post('/vouchers')
      .set('Authorization', `Bearer ${superUserToken}`)
      .send({ amount: 100, cost: 50, company: 'Test Company' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        voucherId = res.body._id;
        done();
      });
  });

  it('should purchase the voucher as normal user', (done) => {
    chai.request(app)
      .post('/purchase')
      .set('Authorization', `Bearer ${normalUserToken}`)
      .send({ userId: 'normaluserId', voucherId })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });
});
