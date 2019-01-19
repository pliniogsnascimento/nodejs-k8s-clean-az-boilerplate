class ServerError extends Error {
  constructor(...args, logger) {
      super(...args);
      this.logger = logger;
      Error.captureStackTrace(this, ServerError);
  }
}