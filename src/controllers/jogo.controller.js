const mongoose = require('mongoose');
const jogoSchema = require('../models/jogo.model');
const jogoModel = mongoose.model('jogo');
const serverResponse = require('../utils/ServerResponse');


module.exports = function jogoController(rep) {


  this.createQueryObject = (queryObject) => {
    let query = {};

    for (let key in queryObject)
      query[key] = queryObject[key];

    return query;
  }


  this.getAllJogos = (req, res) => {

    const query = this.createQueryObject(req.query);
    if (query.limit) {
      let limit = query.limit
      delete query.limit;
      console.log(query)
      rep.getResourceList(query,limit,jogoModel)//(err, jogos) => {
        .then((jogos) => {
          new serverResponse(jogos, res)
            .addLink({ rel: 'self', href: req.path })
            .ok();
        }, (err) => {
          new serverResponse(err, res).internalError();
        });
    } else {
      rep.getAllResources(query, jogoModel)//(err, jogos) => {
        .then((jogos) => {
          new serverResponse(jogos, res)
            .addLink({ rel: 'self', href: req.path })
            .ok();
        }, (err) => {
          new serverResponse(err, res).internalError();
        });
    }
  }


  this.getJogoByID = (req, res) => {

    const id = { _id: req.params.id };

    rep.getResourceByID(id, jogoModel)
      .then((jogo) => {

        let resp = {
          data: jogo,
          links: [
            {
              rel: 'self',
              href: req.path
            }
          ]
        }

        if (jogo.imagem) {
          resp.links.push({
            rel: 'imagem',
            href: '/static/' + jogo.imagem
          });
        }
        new serverResponse(jogo, res).ok();

      }, (err) => {
        new serverResponse(err, res).internalError();
      });
  }

  this.postJogo = (req, res) => {
    let jogo = new jogoSchema(req.body);
    rep.postResource(jogo)
      .then((jogo) => {
        new serverResponse(jogo, res).created();
      }, (err) => {
        new serverResponse(err, res).internalError();
      })
  }

  this.updateJogo = (req, res) => {
    let jogoAtualizado = req.body;
    let id = { _id: req.params.id };

    rep.updateResource(id, jogoModel, jogoAtualizado)
      .then((jogo) => {
        new serverResponse(jogo, res).ok();
      }, (err) => {
        new serverResponse(err, res).notModified();
      });
  }

  this.deleteJogo = (req, res) => {
    let id = { _id: req.params.id };

    rep.deleteResource(id, jogoModel)
      .then((jogo) => {
        new serverResponse(jogo, res).ok();
      }, (err) => {
        new serverResponse(err, res).internalError();
      });
  }


  this.checkExistence = (req, res, next) => {

    let id = { _id: req.params.id };

    rep.getResourceByID(id, jogoModel)
      .then((jogos) => {
        next();
      }, (err) => {
        new serverResponse(err, res).internalError();
      });
  }

  this.insertImage = (req, res) => {
    let imagem = req.file;
    let id = { _id: req.params.id };


    rep.updateResource(id, jogoModel, { imagem: imagem.filename })
      .then((jogo) => {

        let resp = {
          imagem: imagem,
          links: [
            {
              rel: 'self',
              href: req.path
            },
            {
              rel: 'imagem',
              href: '/public/' + imagem.filename
            },
            {
              rel: 'produto',
              href: '/api/v1/jogos/' + id,
            }
          ]
        }

        new serverResponse({}, res).ok();
      }, (err) => {
        new serverResponse(err, res).notModified();
      });
  }


}