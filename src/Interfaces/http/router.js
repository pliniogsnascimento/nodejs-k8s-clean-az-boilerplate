const morgan = require('morgan');
const helmet = require('helmet');
const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const ROUTE_PREFIX = '/api/v1';

module.exports = ({config, containerMiddleware, healthMiddleware, controllers}) => {
  console.log('--- ' + config.get('App.name') + ' ' + config.get('App.kind') +' ---');
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
    .use(morgan('dev'))
    .use(helmet());

  //API ROUTES
  app.use(`${ROUTE_PREFIX}/games`, controllers.gamesController.router);
  
  return app;
}
