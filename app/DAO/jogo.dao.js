const mongoose = require('mongoose');
const jogoM = require('../models/jogo.model');
const jogoModel = mongoose.model('jogo');


module.exports.buscarJogoDAO = (query, cb) => {
  jogoModel.find(query, cb);
};

module.exports.buscarJogoPorIdDAO = (id, cb) => {
  jogoModel.findById(id, cb);
};

module.exports.cadastraJogoDAO = (jogo,cb) => {
  jogo.save(cb);
};

module.exports.alteraJogoDAO = (id, jogoAtualizado, cb) => {
  jogoModel.findOneAndUpdate({ _id: id }, jogoAtualizado, {new: true}, cb);
};


module.exports.removerJogoDAO = (id, cb) => {
  jogoModel.find(id)
    .remove(cb);
};
