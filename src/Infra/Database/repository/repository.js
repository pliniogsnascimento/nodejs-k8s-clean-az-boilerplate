const mongo = require('./mongo');
mongo.connect();

function Repository() {

  this.getAllResources = async (query, model) => {
    return await model.find(query);
  }

  this.getResourceList = async (query, limit, model) => {
    return await model.find(query)
      .limit(parseInt(limit))
      .exec();
  }

  this.getResourceByID = async (id, model) => {
    return await model.findById(id);
  }

  this.postResource = async resource => {
    return await resource.save();
  }

  this.updateResource = async (id, model, resourceAtualizado) => {
    return await model.findOneAndUpdate({ _id: id },
      resourceAtualizado,
      { new: true });
  }

  this.deleteResource = async (id, model) => {
      return await model.find(id)
        .remove();
  }
}

module.exports = Repository;