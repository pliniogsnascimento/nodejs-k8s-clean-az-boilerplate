let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = 'http://localhost:5000'
let should = chai.should();
let expect = chai.expect;
const {EventEmitter} = require('events');
const mediator = new EventEmitter();

chai.use(chaiHttp);

//Testa a consulta de todos os jogo
describe('/GET Todos os jogos', () => {
    it('Deve retornar todos os jogos', (done) => {
      chai.request(app)
          .get('/api/v1/jogos')
          .end((err, res) => {
            let body = res.body.data;
            res.should.have.status(200);
            body.should.be.a('array');
        done();
      });
    });
  });

  describe('/GET Jogo por ID', () => {
    it('Deve retornar um jogo de acordo com id informado', (done) => {
      let id = '5b66b41af93eb61440c8edbd'
      chai.request(app)
          .get('/api/v1/jogos/' + id)
          .end((err, res) => {
            let body = res.body.data;
            res.should.have.status(200);
            body.should.have.property('_id');
            body.should.have.property('nome');
            body._id.should.be.eql('5b66b41af93eb61440c8edbd')
        done();
      });
    });
  });

  describe('/GET Lista de jogos', () => {
    it('Deve retornar uma lista de cinco jogos', (done) => {
      chai.request(app)
          .get('/api/v1/jogos/?limit=2')
          .end((err, res) => {
            let body = res.body.data;
            res.should.have.status(200);
            body.should.be.a('array');
            body.length.should.be.eql(2);
        done();
      });
    });
  });