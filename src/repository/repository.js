const repository = (db) => {

  const getAllValues = (query, cb, schema) => {

    return new Promise((resolve, reject) => {
      
      schema.find(query,(err, values) => {
        if(values) {
          resolve(values);
        } else {
          reject(err);
        }
      });
    });
  }

  const getValuesByID = (id) => {
    return new Promise((resolve, reject) => {

    })
  }

  // this will close the database connection
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllValues,
    getValuesByID,
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