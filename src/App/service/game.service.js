// const Repository = require('../repository/repository');
// const GameSchema = require('../models/jogo.model');

class JogoService {

  constructor() {
    // this.rep = new Repository();
    // this.gameModel = require('mongoose').model('jogo');
  }

  // getAllGames = async query => this.rep.getAllResources(query, this.gameModel);
  // getGamesByName = async name => this.rep.getAllResources({ nome: { '$regex': name, $options: 'i' } }, this.gameModel);
  // getGameById = async id => this.rep.getResourceByID(id, this.jogoModel);

  // //TODO: Concertar paginação
  // getGamesWithPagination = async (query, limit) => this.rep.getResourceList(query, limit = 25, this.gameModel);
  // saveGame = async game => this.rep.postResource(new GameSchema(game));
  // updateGame = async (id, game) => this.rep.updateResource(id, this.gameModel, game);
  // deleteGame = async id => this.rep.deleteResource(id, this.gameModel);
  
}

module.exports = JogoService;
