class GamesApplication {
  constructor({gamesService, logger, gameEntity}) {
    this.service = gamesService;
    this.logger = logger;
    this.game = gameEntity;

    this.logger.debug('New instance: GamesApplication');
  }

  createQueryObject(queryObject) {
    // let query = {};

    // for (let key in queryObject)
    //   query[key] = queryObject[key];

    // return query;
  }

  async searchAllGames(params) {
    const games = await this.service.getAllGames(params);

    return games;

    // let games;

    // if (req.query.nome)
    //   games = this.service.getGamesByName(req, res);

    // else {
      // const query = this.createQueryObject(req.query);

      // if (query.limit) {
      //   let limit = query.limit;
      //   delete query.limit;
      //   games = await this.service.getGamesWithPagination(query, limit);
      // }
      // else
      //   games = await this.service.getAllGames(query, this.jogoModel);

      // new serverResponse(games, res)
      //   .addLink({ rel: 'self', href: req.path })
      //   .ok();
    // }
  }

  async saveGame(game) {
    this.game.object = game;

    this.game.validate();

    return await this.service.saveGame(this.game.object);
    // let game = req.body;
    // const savedGame = await this.service.saveGame(game);
    // new serverResponse(savedGame, res).created();
  }

  getGameById(id) {
    // const id = { _id: req.params.id };

    // const game = await this.service.getGameById(id, this.jogoModel)
    // let resp = {
    //   data: game,
    //   links: [
    //     {
    //       rel: 'self',
    //       href: req.path
    //     }
    //   ]
    // }

    // if (game.imagem) {
    //   resp.links.push({
    //     rel: 'imagem',
    //     href: '/static/' + game.imagem
    //   });
    // }
    // new serverResponse(game, res).ok();
  }

  updateGame(game) {
    // let game = req.body;
    // let id = { _id: req.params.id };

    // const updatedGame = await this.service.updateGame(id, game);

    // if (updatedGame !== game)
    //   new serverResponse(jogo, res).ok();
    // else
    //   new serverResponse(err, res).notModified();
  }

  deleteGame(id) {
    // let id = { _id: req.params.id };
    // await this.service.deleteGame(id)
    // new serverResponse(jogo, res).ok();
  }
}

module.exports = GamesApplication;
