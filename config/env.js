const configFile = require('./env.json');

let config = {};

console.log(configFile);
console.log(process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
    case 'production':
        config = configFile['configs'];
        // configProductionEnvironment(config);
        break;

    default:
        config.MONGO_URI = 'mongodb://localhost:27017/ecommerce';
        config.PORT = 5000;
        break;
}

module.exports = config;
