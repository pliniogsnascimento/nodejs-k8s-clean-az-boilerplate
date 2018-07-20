const mongoose = require('mongoose');
const jogoM = require('../models/jogoModel');
const jogoModel = mongoose.model('jogo');


module.exports.buscarJogoDAO = (query,callback) => {
  jogoModel.find(query,(err, jogos) => { 
    

   
    callback(err, jogos);

  });
};

module.exports.buscarJogoPorIdDAO = (id, callback) => {
    jogoModel.findById(id,(err, jogos) => {
      
      
   
      callback(err, jogos);

  });
};

module.exports.cadastraJogoDAO = (jogo,callback) => {
  
  jogo.save((err, jogos) => {    
   
    
   
    callback(err, jogos);

  });
};

module.exports.alteraJogoDAO = (id, jogoAtualizado, callback) => {
  jogoModel.findOneAndUpdate({ _id: id }, jogoAtualizado, {new: true}, (err, jogos) => {
    
    

    callback(err, jogos);
    
  });
};


module.exports.removerJogoDAO = (id, callback) => {
  jogoModel.find(id)
  .remove((err, jogos) => {
    
    
   
    callback(err, jogos);
   
  });
};
