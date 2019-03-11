const GameSchema = require('../../Infra/Database/models/jogo.model');

class JogoService {

  constructor({ repository }) {
    this.rep = repository;
    this.gameModel = require('mongoose').model('jogo');
  }

  async getAllGames(query) { return await this.rep.getAllResources(query, this.gameModel) }
  async saveGame(game) { return await this.rep.postResource(new GameSchema(game)) }
}

module.exports = JogoService;
