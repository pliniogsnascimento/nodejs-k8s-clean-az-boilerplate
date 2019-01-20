// Docs at https://validatejs.org/
const validate = require('validate.js');

class Games {
  constructor({ logger, modelNotValidException }) {
    this.object = {};
    this.logger = logger;
    this.ModelNotValidException = modelNotValidException;
  }

  validate() {
    this.logger.debug('Validating model');

    const constraints = {
      name: {
        presence: true
      }
    }
    
    const result = validate(this.object, constraints);

    if(!(result === null || result === undefined)) {
      this.ModelNotValidException.message = 'Model sent is not valid';
      this.ModelNotValidException.errors = result;
      this.ModelNotValidException.model = 'Game';
      throw this.ModelNotValidException;
    }
  }

  serialize({id, name}) {
    return {
      id, name
    }
  }
}

module.exports = Games;
