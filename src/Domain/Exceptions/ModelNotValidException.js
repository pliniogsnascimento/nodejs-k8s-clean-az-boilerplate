class ModelNotValidException extends Error {
  constructor(message, options, errors, model) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.message = 'Model sent is not valid';
    this.options = options;
    this.errors = errors;
    this.model = model;
    this.statusCode = 422;
  }

  json() {
    return {
      message: this.message,
      model: this.model,
      errors: this.errors
    }
  }
}

module.exports = ModelNotValidException;
