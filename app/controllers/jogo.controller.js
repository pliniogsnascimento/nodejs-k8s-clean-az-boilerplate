//#region Imports

const mongoose = require('mongoose');
const jogoM = require('../models/jogo.model');
const jogoModel = mongoose.model('jogo');
const jogoDAO = require('../DAO/jogo.dao');
const jsonValidator = require('../utils/jsonValidator');
const ServerResponse = require('../utils/ServerResponse');

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
// const ServerResponse = require('fwsp-server-response');
// let serverResponse = new ServerResponse();

//#endregion

function createQueryObject(queryObject) {
  let query = {};

  for(let key in queryObject) 
    query[key] = queryObject[key];
  
  return query;
}

module.exports.buscarJogos = (req, res) => {
  const query = createQueryObject(req.query);

  jogoDAO.buscarJogoDAO(query, (err, jogos) => {
    if (err) 
      new ServerResponse(err, res).internalError();
    
    else if (jsonValidator.isEmpty(jogos[0])) 
        new ServerResponse(null, res).noContent();

    else 
      new ServerResponse(jogos, res)
        .addLink({ rel: 'self',  href: req.path })
        .ok();
  });
}

module.exports.buscarJogoPeloId = (req, res) => {
  let id = { _id: req.params.id };

  jogoDAO.buscarJogoPorIdDAO(id, (err, jogos) => {
    if (err) 
      new ServerResponse(err, res).internalError();
    
    else if (jogos !== null && jogos !== undefined) {
      const resp = new ServerResponse(jogos)
        addLink({ rel: 'self', href: req.path });

      if (jogos.imagem) 
        resp.addLink({ rel: 'imagem', href: '/static/' + jogos.imagem });

      resp.ok();
    }
    
    else 
      new ServerResponse(null, res).noContent();
  });
}

module.exports.validarJogoExistente = (req, res, next) => {

  let id = { _id: req.params.id };

  jogoDAO.buscarJogoPorIdDAO(id, (err, jogos) => {
    if (err) 
      new ServerResponse(err, res).internalError();
    
    else if (jogos !== null && jogos !== undefined) 
      next();
    
    else 
      new ServerResponse(null, res).badRequest();
  });

}

module.exports.salvarJogo = (req, res) => {
  let jogo = new jogoM(req.body);

  jogoDAO.cadastraJogoDAO(jogo, (err, jogos) => {
    if (err) 
      new ServerResponse(err, res).internalError();
    
    else if (jsonValidator.isEmpty(jogos)) 
        new ServerResponse(null, res).noContent();

    else 
      new ServerResponse(jogos, res).created();
  });
}

module.exports.alterarJogo = (req, res) => {
  let jogosAtualizados = req.body;

  let id = { _id: req.params.id };

  jogoDAO.alteraJogoDAO(id, jogosAtualizados, (err, jogos) => {
    if (err) 
      new ServerResponse(err, res).internalError();

    else if (jsonValidator.isEmpty(jogos)) 
      new ServerResponse(null, res).noContent();

    else 
      new ServerResponse(jogos, res).ok();
  });
}

module.exports.removerJogo = (req, res) => {
  let id = { _id: req.params.id };

  jogoDAO.removerJogoDAO(id, (err, jogos) => {
    if (err) 
      new ServerResponse(err, res).internalError();

    else if (jsonValidator.isEmpty(jogos)) 
      new ServerResponse(null, res).noContent();

    else 
      new ServerResponse(jogos, res).ok();
      
    
  })
}

module.exports.inserirArquivoImagem = (req, res) => {
  const imagem = req.file;

  const resp = new ServerResponse(imagem, res)
    .addLink({ rel: 'self', href: req.path })
    .addLink({ rel: 'imagem', href: '/static/' + imagem.filename })
    .addLink({ rel: 'produto', href: '/api/v1/jogos/' + req.params.id, });

  jogoDAO.alteraJogoDAO(req.params.id, { imagem: imagem.filename }, (jogo) => {
    resp.ok();
  });
}
