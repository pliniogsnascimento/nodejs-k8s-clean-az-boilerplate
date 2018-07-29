const mongoose = require('mongoose');
let produto = require('./produtoModel');

let console = produto.discriminator('console', mongoose.Schema({
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

