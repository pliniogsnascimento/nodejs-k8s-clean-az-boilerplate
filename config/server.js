const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
//const jogoRoutes = require('../src/routes/jogo.route.js');
//const consoleRoutes = require('../src/routes/console.route.js');
const routes = require('../src/routes/routes');
const cors = require('cors');

const start = (config) => {
  let app = express();
  return new Promise((resolve, reject) => {

    if (!config.repo) {
      reject(new Error('O servidor deve ser iniciado com um repositorio'))
    }

    if (!config.port) {
      reject(new Error('O servidor deve ser iniciado com uma porta valida'))
    }

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      headers: ['Content-Type', 'Authorization', 'token']
    }));

    app.use(morgan('dev'))
    app.use(helmet())
    app.use('/static', express.static('public'));
    
    routes(app,config);
    //jogoRoutes(app,config.repo)

    const server = app.listen(config.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})

