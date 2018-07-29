const {dbSettings} = require('./databaseConfig');
const {serverSettings} = require('./serverConfig');
const db = require('./mongo');

module.exports = Object.assign({}, {dbSettings, serverSettings, db})
