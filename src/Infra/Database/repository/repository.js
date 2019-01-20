class Repository {
  constructor({ logger, dbConnect }) {
    this.logger = logger;

    this.logger.debug('Creating repository');
    Promise.resolve(dbConnect);
  }

  async getAllResources(query, model) {
    this.logger.debug('Getting all resources');
    const resources = await model.find();

    this.logger.debug('Results', resources);

    return resources;
  }

  async getResourceList(query, limit, model) {
    return await model.find(query)
      .limit(parseInt(limit))
      .exec();
  }

  async getResourceByID(id, model) {
    return await model.findById(id);
  }

  async postResource(resource) {
    return await resource.save();
  }

  async updateResource(id, model, updatedResource) {
    return await model.findOneAndUpdate({ _id: id },
      updatedResource,
      { new: true });
  }

  async deleteResource(id, model) {
      return await model.find(id)
        .remove();
  }
}

module.exports = Repository;