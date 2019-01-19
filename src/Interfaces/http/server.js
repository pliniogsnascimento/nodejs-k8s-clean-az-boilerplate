const express = require('express');

class Server {
  constructor({ config, router, logger }) {
    this.config = config;
    this.logger = logger;

    this.express = express();
    this.express.use(router);
  }

  start() {
    return new Promise(resolve => {
      this.express.listen(this.config.get('Server.port'), () => {
        this.logger.info('Server ' + this.config.get('Server.host') + ' is running on port ' + 
          this.config.get('Server.port'));

        resolve();
      });
    }, reject => {
      reject(new ServerError());
    });
  }
}

module.exports = Server;
