const serverResponse = require('../utils/ServerResponse');
const GameService = require('../service/game.service');

module.exports = function jogoController() {
  this.service = new GameService();
  this.serverResponse = require('../utils/ServerResponse');

  this.createQueryObject = queryObject => {
    let query = {};

    for (let key in queryObject)
      query[key] = queryObject[key];

    return query;
  }

  //TODO : Make pagination default
  this.getAllJogos = async (req, res) => {
    let games;

    if (req.query.nome)
      games = this.service.getGamesByName(req, res);

    else {
      const query = this.createQueryObject(req.query);

      if (query.limit) {
        let limit = query.limit;
        delete query.limit;
        games = await this.service.getGamesWithPagination(query, limit);
      }
      else
        games = await this.service.getAllGames(query, this.jogoModel);

      new serverResponse(games, res)
        .addLink({ rel: 'self', href: req.path })
        .ok();
    }
  }

  this.getJogoByID = async (req, res) => {
    const id = { _id: req.params.id };

    const game = await this.service.getGameById(id, this.jogoModel)
    let resp = {
      data: game,
      links: [
        {
          rel: 'self',
          href: req.path
        }
      ]
    }

    if (game.imagem) {
      resp.links.push({
        rel: 'imagem',
        href: '/static/' + game.imagem
      });
    }
    new serverResponse(game, res).ok();
  }

  this.postJogo = async (req, res) => {
    let game = req.body;
    const savedGame = await this.service.saveGame(game);
    new serverResponse(savedGame, res).created();
  }

  this.updateJogo = async (req, res) => {
    let game = req.body;
    let id = { _id: req.params.id };

    const updatedGame = await this.service.updateGame(id, game);

    if (updatedGame !== game)
      new serverResponse(jogo, res).ok();
    else
      new serverResponse(err, res).notModified();
  }

  this.deleteJogo = async (req, res) => {
    let id = { _id: req.params.id };
    await this.service.deleteGame(id)
    new serverResponse(jogo, res).ok();
  }
}