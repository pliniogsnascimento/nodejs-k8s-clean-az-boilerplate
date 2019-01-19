class GamesApplication {
  constructor({gamesService, logger}) {
    this.service = gamesService;
    this.logger = logger;

    this.logger.debug('New instance: GamesApplication');
  }

  createQueryObject(queryObject) {
    // let query = {};

    // for (let key in queryObject)
    //   query[key] = queryObject[key];

    // return query;
  }

  searchAllGames(params) {
    return {
      data: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
      ]
    }
  }
}

module.exports = GamesApplication;
