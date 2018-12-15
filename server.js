const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
const cors = require('cors');
const config = require('config');

const start = () => {
  let app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    headers: ['Content-Type', 'Authorization', 'token']
  }));

  routes.health(app);

  app.use(morgan('dev'));
  app.use(helmet());

  routes.configure(app);

  app.listen(config.get('Server.port'), () => {
    console.log('Server ' + config.get('Server.host') + ' is running on port ' + config.get('Server.port'));
  });
}

module.exports = Object.assign({}, { start });

