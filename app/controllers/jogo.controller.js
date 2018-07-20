//#region Imports

const mongoose = require('mongoose');
const jogoM = require('../models/jogo.model');
const jogoModel = mongoose.model('jogo');
const jogoDAO = require('../DAO/jogo.dao');
const jsonValidator = require('../utils/jsonValidator');
const Hateoas = require('../utils/hateoas');

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
let serverResponse = new ServerResponse();

//#endregion

module.exports.buscarJogos = (req, res) => {
  let query = {};

  for(let key in req.query) 
    query[key] = req.query[key];

  jogoDAO.buscarJogoDAO(query, (err, jogos) => {
    if (err) 
      new Hateoas(err, res).internalError();
    
    else if (jsonValidator.isEmpty(jogos[0])) 
        new Hateoas(null, res).noContent();

    else 
      new Hateoas(jogos, res)
        .addLink({ rel: 'self',  href: req.path })
        .ok();
  });
}

module.exports.buscarJogoPeloId = (req, res) => {
  let id = { _id: req.params.id };

  jogoDAO.buscarJogoPorIdDAO(id, (err, jogos) => {
    if (err) 
      new Hateoas(err, res).internalError();
    
    else if (jogos !== null && jogos !== undefined) {
      const resp = new Hateoas(jogos)
        addLink({ rel: 'self', href: req.path });

      if (jogos.imagem) 
        resp.addLink({ rel: 'imagem', href: '/static/' + jogos.imagem });

      resp.ok();
    }
    
    else 
      new Hateoas(null, res).noContent();
  });
}

module.exports.validarJogoExistente = (req, res, next) => {

  let id = { _id: req.params.id };

  jogoDAO.buscarJogoPorIdDAO(id, (err, jogos) => {
    if (err) 
      new Hateoas(err, res).internalError();
    
    else if (jogos !== null && jogos !== undefined) 
      next();
    
    else 
      new Hateoas(null, res).badRequest();
  });

}

module.exports.salvarJogo = (req, res) => {
  let jogo = new jogoM(req.body);

  jogoDAO.cadastraJogoDAO(jogo, (err, jogos) => {
    if (err) 
      new Hateoas(err, res).internalError();
    
    else if (jsonValidator.isEmpty(jogos)) 
        new Hateoas(null, res).noContent();

    else 
      new Hateoas(jogos, res).created();
  });
}

module.exports.alterarJogo = (req, res) => {
  let jogosAtualizados = req.body;

  let id = { _id: req.params.id };

  jogoDAO.alteraJogoDAO(id, jogosAtualizados, (err, jogos) => {
    if (err) 
      new Hateoas(err, res).internalError();

    else if (jsonValidator.isEmpty(jogos)) 
      new Hateoas(null, res).noContent();

    else 
      new Hateoas(jogos, res).ok();
  });
}

module.exports.removerJogo = (req, res) => {
  let id = { _id: req.params.id };

  jogoDAO.removerJogoDAO(id, (err, jogos) => {
    if (err) 
      new Hateoas(err, res).internalError();

    else if (jsonValidator.isEmpty(jogos)) 
      new Hateoas(null, res).noContent();

    else 
      new Hateoas(jogos, res).ok();
      
    
  })
}

module.exports.inserirArquivoImagem = (req, res) => {
  const imagem = req.file;

  const resp = new Hateoas(imagem, res)
    .addLink({ rel: 'self', href: req.path })
    .addLink({ rel: 'imagem', href: '/static/' + imagem.filename })
    .addLink({ rel: 'produto', href: '/api/v1/jogos/' + req.params.id, });

  jogoDAO.alteraJogoDAO(req.params.id, { imagem: imagem.filename }, (jogo) => {
    resp.ok();
  });
}
