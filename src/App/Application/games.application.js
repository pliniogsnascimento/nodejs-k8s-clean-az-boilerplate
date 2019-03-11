class GamesApplication {
  constructor({gamesService, logger, gameEntity}) {
    this.service = gamesService;
    this.logger = logger;
    this.game = gameEntity;

    this.logger.debug('New instance: GamesApplication');
  }

  async searchAllGames(params) {
    const games = await this.service.getAllGames(params);

    return games;
  }

  async saveGame(game) {
    this.game.object = game;

    this.game.validate();

    return await this.service.saveGame(this.game.object);
  }
}

module.exports = GamesApplication;
