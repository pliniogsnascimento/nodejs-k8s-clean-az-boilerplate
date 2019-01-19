const Eureka = require('eureka-js-client').Eureka;
const appInsights = require('applicationinsights');

class Application {
  constructor({server, config, logger}) {
    this.server = server;
    this.config = config
    this.logger = logger
  }

  async start() {
    // if(this.database) {
    //   await this.database.authenticate();
    // }

    if(this.config.get('Server.enableServiceDiscovery'))
      this.enableServiceDiscovery();
    
    if(this.config.get('Server.enableAppInsights'))
      this.enableAppInsights();

    await this.server.start();
  }

  enableServiceDiscovery() {
    this.logger.info('Configuring service discovery...');
  
    // TODO: Resolver esta bagaça
    const client = new Eureka({
      cwd: `${__dirname}/config`
    });
  
    client.start();
  }
  
  enableAppInsights() {
    this.logger.info('Starting application insights...');
  
    const key = this.config.get('AppInsights.instrumentationKey');
    appInsights.setup(key)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .start();
    
    this.logger.info('Using application insights');
  }
}

module.exports = Application;