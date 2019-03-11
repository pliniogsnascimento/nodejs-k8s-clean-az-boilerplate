const container = require('./src/container');

const app = container.resolve('app');

try {
  app.start();
} catch(err) {
  console.error('Error on dependency injection', err);
}

