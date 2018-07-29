const repository = (db,collection) => {

  const getAllJogos = () => {
    return new Promise((resolve, reject) => {
    });
  }

  const getJogosById = (id) => {
    return new Promise((resolve, reject) => {
     
    })
  }

  // this will close the database connection
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllJogos,
    getJogosById,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('Conexão do banco não fornecida'))
    }
    resolve(repository(connection))
  })
}

// this only exports a connected repo
module.exports = Object.assign({}, { connect })