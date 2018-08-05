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

    rep.getAllResources(query, jogoModel)//(err, jogos) => {
      .then((jogos) => {
        let resp = {
          data: jogos,
          links: [{
            rel: 'self',
            href: req.path
          }]
        }
        new serverResponse(resp, res).ok();
      }, (err) => {
        new serverResponse(err, res).internalError();
      });
  }


  this.getJogoByID = (req, res) => {

    let id = { _id: req.params.id };

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
        new serverResponse(err, res).internalError();
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
}
/*
  

  module.exports.validarJogoExistente = (req, res, next) => {

    let id = { _id: req.params.id };

    jogoDAO.buscarJogoPorIdDAO(id, (err, jogos) => {
      if (err) {
        res.status(500).json(err);
      }
      else if (jogos !== null && jogos !== undefined) {
        next();
      } else {
        res.status(400).send();
      }
    });

  }

  module.exports.salvarJogo = (req, res) => {
    let jogo = new jogoM(req.body);
    jogoDAO.cadastraJogoDAO(jogo, (err, jogos) => {
      if (err) {
        res.status(400).json(err);
      } else {
        if (jsonValidator.isEmpty(jogos)) {
          res.status(204).send();
        } else {
          res.status(201).json(jogos);
        }
      }
    });
  }



  module.exports.removerJogo = (req, res) => {
    let id = { _id: req.params.id };
    jogoDAO.removerJogoDAO(id, (err, jogos) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (jsonValidator.isEmpty(jogos)) {
          res.status(204).send();
        } else {
          res.status(200).json(jogos);
        }
      }
    })
  }

  module.exports.inserirArquivoImagem = (req, res) => {
    const imagem = req.file;

    let resp = {
      imagem: imagem,
      links: [
        {
          rel: 'self',
          href: req.path
        },
        {
          rel: 'imagem',
          href: '/static/' + imagem.filename
        },
        {
          rel: 'produto',
          href: '/api/v1/jogos/' + req.params.id,
        }
      ]
    }

    jogoDAO.alteraJogoDAO(req.params.id, { imagem: imagem.filename }, (jogo) => {
      res.status(200).json(resp);
    })
  }
*/
