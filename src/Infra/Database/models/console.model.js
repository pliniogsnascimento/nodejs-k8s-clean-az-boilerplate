const mongoose = require('mongoose');
const produtoModel = require('./produto.model');

let console = produtoModel.discriminator('console', mongoose.Schema({
    fabricante: {
        type: String,
        required: true
    },

    especificacoes: {
        type: String
    },

    armazenamento: {
        type: String,
        required: true
    }
})); 

module.exports = console;

