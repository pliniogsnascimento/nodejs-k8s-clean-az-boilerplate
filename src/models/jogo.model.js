const mongoose = require('mongoose');
const produtoModel = require('./produtoModel');
 
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
    }
}));

module.exports = jogoModel;
