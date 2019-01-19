const container = require('./src/container');

const app = container.resolve('app');

app.start();
