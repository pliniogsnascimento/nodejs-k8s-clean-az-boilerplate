const ModelNotValidException = require('../../../Domain/Exceptions/ModelNotValidException');


/* istanbul ignore next */
module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { logger } = req.container.cradle;

  logger.debug('Processing error handler');

  if(err instanceof ModelNotValidException)
    res.status(err.statusCode).send(err.json());

  else {
    logger.error('Unhandled Exception\n', err);
    res.status(500).json({
      type: 'InternalServerError',
      message: err.message,
      stack: err.stack
    });
  }
};