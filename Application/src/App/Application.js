const Eureka = require('eureka-js-client').Eureka;
const appInsights = require('applicationinsights');
const path = require('path');

class Application {
  constructor({server, config, logger, eventSource}) {
    this.server = server;
    this.config = config;
    this.logger = logger;
    this.eventSource = eventSource;
  }

  async start() {
    try {
      console.time('Service Init');

      if(this.config.get('Server.enableAppInsights'))
        this.enableAppInsights();
      else
        this.logger.warn('Application Insights is disabled');
  
      if(this.config.get('Server.enableServiceDiscovery'))
        this.enableServiceDiscovery();
        this.logger.warn('Service Discovery is disabled');
      
      await this.server.start();
      await this.eventSource.start();
      
      console.timeEnd('Service Init');
    } catch(err) {
      this.logger.fatal('Error starting the service.', err);
    }
  }

  enableServiceDiscovery() {
    this.logger.info('Configuring service discovery...');
    const configPath = path.resolve('config/');

    const client = new Eureka({
      cwd: configPath
    });
    
    client.start(err => {
      if(err)
        this.logger.error('Error trying to connect Eureka Server', err);
    });
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