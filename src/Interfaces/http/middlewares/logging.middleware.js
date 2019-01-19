const morgan = require('morgan');
const path = require('path');
const logAdapterPath = path.resolve('src/Infra/logging/loggingStreamAdapter');
const LoggerStreamAdapter = require(logAdapterPath);

module.exports = ({ logger }) => {
  return morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger)
  });
};