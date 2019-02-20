const morgan = require('morgan');
const helmet = require('helmet');
const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorMiddleware = require('./middlewares/errorHandling.middleware');

const ROUTE_PREFIX = '/api/v1';

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

  app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      headers: ['Content-Type', 'Authorization', 'token']
    }))
    .use(healthMiddleware)
    .use(containerMiddleware)
    .use(loggingMiddleware)
    .use(helmet());
  
  logger.debug('Middlewares are set!');

  // API ROUTES
  app.use(`${ROUTE_PREFIX}/games`, gamesController.router);

  logger.debug('Api Routes are set!');
  
  // Error Handling
  app.use(errorMiddleware);
  logger.debug('Error handling middleware is set!');

  return app;
}
