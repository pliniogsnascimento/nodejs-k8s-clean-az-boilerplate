

class EventSource {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger;
  }

  async start() {
    const kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = kafka.KafkaClient({ kafkaHost: 'localhost:9092' }),
    consumer = new Consumer(client, 
      [
        { topic: 'test', partition: 0 }
      ],
      {
        autoCommit: false
      });
  
    consumer.on('message', function (message) {
        console.log(message);
    });

    consumer.on('error', err => {
      console.log(err);
    })
  }
  
}

module.exports = EventSource;