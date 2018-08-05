const repository = (db) => {

  const getAllResources = (query, model) => {
    return new Promise((resolve, reject) => {
      model.find(query, (err, resource) => {
        if (resource) {
          resolve(resource);
        } else {
          reject(err);
        }
      });
    });
  }

  const getResourceByID = (id, model) => {
    return new Promise((resolve, reject) => {
      model.findById(id, (err, resource) => {
        if (resource) {
          resolve(resource);
        } else {
          reject(err);
        }
      });
    });
  }

  const postResource = (resource) => {
    return new Promise((resolve, reject) => {
      resource.save((err, resource) => {
        if (resource) {
          resolve(resource);
        } else {
          reject(err);
        }
      });
    });
  }

  const updateResource = (id, model, resourceAtualizado) => {
    return new Promise((resolve, reject) => {
      model.findOneAndUpdate({ _id: id }, resourceAtualizado, { new: true }, (err, resource) => {
        if(resource){
          resolve(resource);
        } else {
          reject(err);
        }
      });
    });
  }

  const deleteResource = (id,model) => {
    return new Promise((resolve, reject) => {
      model.find(id).remove((err, resource) => { 
        if(resource) {
          resolve(resource);
        } else {
          reject(err);
        }
      });
    });
  }

  // this will close the database connection
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllResources,
    getResourceByID,
    postResource,
    updateResource,
    deleteResource,
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