const mongoose = require('mongoose');

let produtoSchema = mongoose.Schema({
    idProduto: {
        type: mongoose.Schema.Types.ObjectId
    },
    nome: {
        type: String,
        required: [true, 'O campo nome é obrigatório'],
        //uppercase: true
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
