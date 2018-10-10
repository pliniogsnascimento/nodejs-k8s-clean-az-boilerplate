const mongoose = require('mongoose');
const consoleSchema = require('../models/console.model');
const consoleModel = mongoose.model('console');
const serverResponse = require('../utils/ServerResponse');


module.exports = function consoleController(rep) {


  this.createQueryObject = (queryObject) => {
    let query = {};

    for (let key in queryObject)
      query[key] = queryObject[key];

    return query;
  }


  this.getAllConsoles = (req, res) => {

    const query = this.createQueryObject(req.query);

    rep.getAllResources(query, consoleModel)
      .then((consoles) => {
        new serverResponse(consoles, res)
          .addLink({rel: 'self',href: req.path})
          .ok();
      }, (err) => {
        new serverResponse(err, res).internalError();
      });
  }


  this.getConsoleByID = (req, res) => {

    const id = { _id: req.params.id };

    rep.getResourceByID(id, consoleModel)
      .then((console) => {

        let resp = {
          data: console,
          links: [
            {
              rel: 'self',
              href: req.path
            }
          ]
        }

        if (console.imagem) {
          resp.links.push({
            rel: 'imagem',
            href: '/static/' + console.imagem
          });
        }
        new serverResponse(console, res).ok();

      }, (err) => {
        new serverResponse(err, res).internalError();
      });
  }

  this.postConsole = (req, res) => {
    let console = new consoleSchema(req.body);
    rep.postResource(console)
      .then((console) => {
        new serverResponse(console, res).created();
      }, (err) => {
        new serverResponse(err, res).internalError();
      })
  }

  this.updateConsole = (req, res) => {
    let consoleAtualizado = req.body;
    let id = { _id: req.params.id };

    rep.updateResource(id, consoleModel, consoleAtualizado)
      .then((console) => {
        new serverResponse(console, res).ok();
      }, (err) => {
        new serverResponse(err, res).notModified();
      });
  }

  this.deleteConsole = (req, res) => {
    let id = { _id: req.params.id };

    rep.deleteResource(id, consoleModel)
      .then((console) => {
        new serverResponse(console, res).ok();
      }, (err) => {
        new serverResponse(err, res).internalError();
      });
  }


  this.checkExistence = (req, res, next) => {

    let id = { _id: req.params.id };

    rep.getResourceByID(id, consoleModel)
      .then((consoles) => {
        next();
      }, (err) => {
        new serverResponse(err, res).internalError();
      });
  }

  this.insertImage = (req, res) => {
    let imagem = req.file;
    let id = { _id: req.params.id };

    
    rep.updateResource(id, consoleModel, { imagem: imagem.filename })
      .then((console) => {
        
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
              href: '/api/v1/console/' + id,
            }
          ]
        }
        
        new serverResponse({}, res).ok();
      }, (err) => {
        new serverResponse(err, res).notModified();
      });
  }


}