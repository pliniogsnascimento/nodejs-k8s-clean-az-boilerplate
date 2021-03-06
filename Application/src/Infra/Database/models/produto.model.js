const mongoose = require('mongoose');

let produtoSchema = mongoose.Schema({
    idProduto: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: [true, 'O campo nome é obrigatório'],
    },
    descricao: {
        type: String
    },
    preco: {
        type: Number,
        required: [true, 'O campo preco é obrigatório']
    },
    imagem: {
        type: String
    }
});

module.exports = mongoose.model('produto', produtoSchema);
