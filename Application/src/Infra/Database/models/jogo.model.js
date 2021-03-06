const mongoose = require('mongoose');
const produtoModel = require('./produto.model');
 
let jogoModel = produtoModel.discriminator('jogo', mongoose.Schema({
    desenvolvedora: {
        type: String
    },

    genero: {
        type: String
    },

    dataLancamento: {
        type: Date
    },

    classificacaoIndicativa: {
        type: String
    },

    plataforma: {
        type: String
    },

    linkTrailer: {
        type: String
    }

}));

module.exports = jogoModel;
