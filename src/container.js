const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const Server = require('./Interfaces/http/server');
const Application = require('./App/Application');

const config = require('config');
const logger = require('./Infra/logging/logger');
const router = require('./Interfaces/http/router');

const healthMiddleware = require('./Interfaces/http/middlewares/health.route');

const controllers = require('./Interfaces/http/controllers/index');

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
    healthMiddleware: asFunction(healthMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container))
  });

container
  .register({
    controllers: asFunction(controllers)
  });

module.exports = container;