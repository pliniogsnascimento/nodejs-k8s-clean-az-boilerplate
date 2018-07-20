const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const configJson = require('./config/hydraConfig.json');//verificar rota
const onRegisterRoutes = require('./app/routes/produtoRoute');
const express = hydraExpress.getExpress();
const app = express();
const consign = require('consign')();
const cors = require('cors');
const bodyParser = require('body-parser');
//const swagger = require('swagger-ui-express')
//const swaggerDocument = require('./swagger.json');
const monitoring = require('./app/utils/monitoring');

//#endregion

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    headers: ['Content-Type', 'Authorization', 'token']
}));

//app.use('/static', express.static('public'));

//app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

app.use((req, res, next) => monitoring.startMonitoring(req, res, next));

consign.include('config/dbConnection.js')
.then('app/controllers')
.into(app);

hydraExpress.init(configJson, () => {
    hydraExpress.registerRoutes({
        '/api/v1/': require('./app/routes/produtoRoute')
    });    
})
.then((serviceInfo) => {
    let logEntry = `Started ${hydra.getServiceName()} (v.${hydra.getInstanceVersion()})`;
    console.log(logEntry);
    console.log(serviceInfo);
  })
  .catch((err) => {
    console.log('err', err);
  });
