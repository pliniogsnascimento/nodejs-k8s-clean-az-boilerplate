const Repository = require('../repository/repository');
const GameSchema = require('../models/jogo.model');

function JogoService() {
  this.rep = new Repository();
  this.gameModel = require('mongoose').model('jogo');

  this.getAllGames = async query => this.rep.getAllResources(query, this.gameModel);
  this.getGamesByName = async name => this.rep.getAllResources({ nome: { '$regex': name, $options: 'i' } }, this.gameModel);
  this.getGameById = async id => this.rep.getResourceByID(id, this.jogoModel);

  //TODO: Concertar paginação
  this.getGamesWithPagination = async (query, limit) => this.rep.getResourceList(query, limit = 25, this.gameModel);
  this.saveGame = async game => this.rep.postResource(new GameSchema(game));
  this.updateGame = async (id, game) => this.rep.updateResource(id, this.gameModel, game);
  this.deleteGame = async id => this.rep.deleteResource(id, this.gameModel);
  
}

module.exports = JogoService;
