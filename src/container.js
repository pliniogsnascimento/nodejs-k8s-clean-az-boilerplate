const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const Server = require('./Interfaces/http/server');
const Application = require('./App/Application');

const config = require('config');
const logger = require('./Infra/logging/logger');
const router = require('./Interfaces/http/router');

const healthMiddleware = require('./Interfaces/http/middlewares/health.middleware');
const loggingMiddleware = require('./Interfaces/http/middlewares/logging.middleware');

const controllers = require('./Interfaces/http/controllers/index');
const gamesController = require('./Interfaces/http/controllers/games.controller');

const gamesApplication = require('./App/Application/games.application');

const gamesService = require('./App/service/game.service');

const gameEntity = require('./Domain/Entities/Games.model');

const modelNotValidException = require('./Domain/Exceptions/ModelNotValidException');

const repository = require('./Infra/Database/repository/repository');
const mongo = require('./Infra/Database/repository/mongo');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    logger: asFunction(logger).singleton(),
    router: asFunction(router).singleton()
  })
  .register({
    config: asValue(config)
  });

  // Middlewares
container
  .register({
    healthMiddleware: asFunction(healthMiddleware).singleton(),
    loggingMiddleware: asFunction(loggingMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container))
  });

// Controllers
container
  .register({
    controllers: asFunction(controllers)
  })
  .register({
    gamesController: asClass(gamesController).transient()
  });

// Application
container
  .register({
    gamesApplication: asClass(gamesApplication).transient()
  });

// Service
container
  .register({
    gamesService: asClass(gamesService).transient()
  });

// Domain
container
  .register({
    gameEntity: asClass(gameEntity).transient()
  })
  .register({
    modelNotValidException: asClass(modelNotValidException).transient()
  });

// Infra
container
  .register({
    repository: asClass(repository).transient(),
    dbConnect: asFunction(mongo.connect).transient(),
    dbDisconnect: asFunction(mongo.disconnect).transient(),
  })

module.exports = container;