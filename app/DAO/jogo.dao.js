const mongoose = require('mongoose');
const jogoM = require('../models/jogo.model');
const jogoModel = mongoose.model('jogo');


module.exports.buscarJogoDAO = (query,callback) => {
  jogoModel.find(query, callback);
};

module.exports.buscarJogoPorIdDAO = (id, callback) => {
  jogoModel.findById(id, callback);
};

module.exports.cadastraJogoDAO = (jogo,callback) => {
  jogo.save(callback);
};

module.exports.alteraJogoDAO = (id, jogoAtualizado, callback) => {
  jogoModel.findOneAndUpdate({ _id: id }, jogoAtualizado, {new: true}, callback);
};


module.exports.removerJogoDAO = (id, callback) => {
  jogoModel.find(id)
    .remove(callback);
};
