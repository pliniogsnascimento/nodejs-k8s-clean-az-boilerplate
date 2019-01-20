const { Router } = require('express');

class GameController {
  constructor({ gamesApplication, logger, gameEntity }) {
    this.app = gamesApplication;
    this.logger = logger;
    this.game = gameEntity;

    this.logger.debug('New instance: Gamescontroller');
  }

  get router() {
    const router = Router();

    router.get('/', (req, res, next) => this.searchAllGames(req, res, next));  
    router.get('/:id', (req, res, next) => this.getGameById(req, res, next));
  
    router.post('/', (req, res, next) => this.saveGame(req, res, next));
  
    router.patch('/:id', (req, res, next) => this.updateGame(req, res, next));
    router.put('/:id', (req, res, next) => this.replaceGame(req, res, next));
  
    router.delete('/:id', (req, res, next) => this.deleteGame(req, res, next));

    this.logger.debug('Game router created');

    return router;
  }

  //TODO : Make pagination default
  async searchAllGames(req, res, next) {
    const games = await this.app.searchAllGames(req.query);

    console.log(games);

    res.status(200).json(games);
  }

  getGameById(req, res, next) {
    const id = { _id: req.params.id };
    const game = this.app.saveGame(id);

    res.status(200).json(game);
  }

  saveGame(req, res, next) {
    const game = this.app.saveGame(req.body);
    res.status(201).json(game);
  }

  updateGame(req, res, next) {
    throw new Error('Not implemented');
  }

  replaceGame(req, res, next) {
    throw new Error('Not implemented');
  }

  deleteGame(req, res, next) {
    throw new Error('Not implemented');
  }
}

module.exports = GameController;
