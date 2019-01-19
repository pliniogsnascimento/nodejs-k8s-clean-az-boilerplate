const Log4js = require('log4js');
// const path = require('path');
// const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = ({ config }) => {
  Log4js.configure(config.get('Logs.log4jsConfig'));

  return Log4js.getLogger(config.get('Logs.logLevel'));
}
