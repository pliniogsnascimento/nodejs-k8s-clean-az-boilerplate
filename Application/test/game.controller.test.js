let mongoose = require("mongoose");
let chai = require('chai');
let app = 'http://localhost:5000'
let should = chai.should();
let expect = chai.expect;
const {EventEmitter} = require('events');
const mediator = new EventEmitter();

describe('Ser o primeiro teste', () => {
    it('Ser o primeiro teste', done => {
      // chai.request(app)
      //     .get('/api/v1/jogos')
      //     .end((err, res) => {
      //       let body = res.body.data;
      //       res.should.have.status(200);
      //       body.should.be.a('array');
        done();
      });
    });

