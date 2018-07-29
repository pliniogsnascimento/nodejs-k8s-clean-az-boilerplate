// we load all the depencies we need
const {EventEmitter} = require('events');
const mediator = new EventEmitter();
const server = require('./config/server');
const repository = require('./src/repository/repository');
const config = require('./config/');
  
console.log('--- Product Service ---')
console.log('Conectando ao Repositorio de Produtos..')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})


mediator.on('db.ready', (db) => {
  let rep;
  repository.connect(db)
    .then(repo => {
      console.log('Repository Conectado. Starting Server')
      rep = repo
      return server.start({port: config.serverSettings.port,repo})
    })
    .then(dbConnection => { //verificar esse app
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      dbConnection.on('close', () => {
        rep.disconnect()
      })
    })
})

mediator.on('db.error', (err) => {
    console.log('Erro no com a Base de dados');
    console.error(err);
})

config.db.connect(config.dbSettings, mediator)

mediator.emit('boot.ready')