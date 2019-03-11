const morgan = require('morgan');
const helmet = require('helmet');
const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorMiddleware = require('./middlewares/errorHandling.middleware');

module.exports = ({
  config, 
  containerMiddleware, 
  healthMiddleware, 
  loggingMiddleware,
  gamesController,
  logger
}) => {
  logger.info('--- ' + config.get('App.name') + ' ' + config.get('App.kind') +' ---');
  let app = Router();

  configureUtils(app);
  configureMiddlewares(app, logger, [containerMiddleware, healthMiddleware, loggingMiddleware]);
  
  app.use(helmet());
  
  configureRoutes(app, config, logger, [ gamesController ]);
  
  // Error Handling
  app.use(errorMiddleware);
  logger.debug('Error handling middleware is set!');

  return app;
}

const configureUtils = app => {
  app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      headers: ['Content-Type', 'Authorization', 'token']
    }));
}

const configureMiddlewares = (app, logger, middlewares) => {
  middlewares.forEach(middleware => {
    app.use(middleware);
  });

  logger.debug('Middlewares are set!');
}

const configureRoutes = (app, config, logger, controllers) => {
  const ROUTE_PREFIX = '/api/' + config.get('App.version');

  controllers.forEach(controller => {
    const endpoint = `${ROUTE_PREFIX}/games`;
    app.use(endpoint, controller.router);
  });

  logger.debug('Api Routes are set!');
}
