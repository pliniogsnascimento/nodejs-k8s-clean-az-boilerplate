const LoggerStreamAdapter = {
  toStream(logger) {
    return {
      write(message) {
        logger.debug(message.slice(0, -1));
      }
    };
  }
};

module.exports = LoggerStreamAdapter;