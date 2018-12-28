const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
const cors = require('cors');
const config = require('config');
const appInsights = require('applicationinsights');

const enableServiceDiscovery =  () => {
  const Eureka = require('eureka-js-client').Eureka;

  console.log('Configuring service discovery...');

  const client = new Eureka({
    cwd: `${__dirname}/config`
  });

  client.start();
}

const enableAppInsights = () => {
  console.log('Starting application insights...');

  const key = config.get('AppInsights.instrumentationKey');
  appInsights.setup(key)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .start();
  
  console.log('Using application insights');
}

const start = () => {
  console.log('--- Product Service ---');
  let app = express();

  if(config.get('Server.enableServiceDiscovery'))
    enableServiceDiscovery();
  
  if(config.get('Server.enableAppInsights'))
    enableAppInsights();  

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

start();
