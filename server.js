const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
const cors = require('cors');
const config = require('config');

const enableServiceDiscovery =  () => {
  const Eureka = require('eureka-js-client').Eureka;

  console.log('Configuring service discovery...');

  const client = new Eureka({
    cwd: `${__dirname}/config`
  });

  // const client = new Eureka({
  //   instance: {
  //     instanceId: 'localhost:products',
  //     app: 'PRODUCTS',
  //     hostName: 'localhost',
  //     statusPageUrl: 'http://localhost:5000',
  //     ipAddr: '127.0.0.1',
  //     port: {
  //       '$': 5000,
  //       '@enabled': true,
  //     },
  //     vipAddress: 'products',
  //     dataCenterInfo: {
  //       '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
  //       name: 'MyOwn',
  //     },
  //   },
  //   eureka: {
  //     host: 'localhost',
  //     port: 8761,
  //     servicePath: '/eureka/apps'
  //   },
  // });

  client.start();
}

const start = () => {
  console.log('--- Product Service ---');
  let app = express();

  if(config.get('Server.enableServiceDiscovery'))
    enableServiceDiscovery();

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
