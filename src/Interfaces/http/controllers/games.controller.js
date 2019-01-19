const { Router } = require('express');

class GameController {
  constructor({ gamesApplication, logger }) {
    this.app = gamesApplication;
    this.logger = logger;

    this.logger.debug('New instance: Gamescontroller');
  }

  get router() {
    const router = Router();

    router.get('/', (req, res, next) => this.searchAllGames(req, res, next));  
  
    router.get('/:id', (req, res) => {
      // const controller = new jogoController();
      // controller.getJogoByID(req, res);
    });
  
    router.post('/', (req, res) => {
      // const controller = new jogoController();
      // controller.postJogo(req, res);
    });
  
    router.patch('/:id', (req, res) => {
      // const controller = new jogoController();
      // controller.updateJogo(req, res);
    });
  
    router.delete('/:id', (req, res) => {
      // const controller = new jogoController();
      // controller.deleteJogo(req, res);
    });

    this.logger.debug('Game router created');

    return router;
  }

  createQueryObject(queryObject) {
    // let query = {};

    // for (let key in queryObject)
    //   query[key] = queryObject[key];

    // return query;
  }

  //TODO : Make pagination default
  searchAllGames(req, res, next) {
    try {
      const games = this.app.searchAllGames(req.query);

      res.json(games);
    } catch(err) {
      this.logger.error('Error searching all games');
    }
    
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

  getJogoByID(req, res) {
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

  postJogo(req, res) {
    // let game = req.body;
    // const savedGame = await this.service.saveGame(game);
    // new serverResponse(savedGame, res).created();
  }

  updateJogo(req, res) {
    // let game = req.body;
    // let id = { _id: req.params.id };

    // const updatedGame = await this.service.updateGame(id, game);

    // if (updatedGame !== game)
    //   new serverResponse(jogo, res).ok();
    // else
    //   new serverResponse(err, res).notModified();
  }

  deleteJogo(req, res) {
    // let id = { _id: req.params.id };
    // await this.service.deleteGame(id)
    // new serverResponse(jogo, res).ok();
  }
}

module.exports = GameController;
