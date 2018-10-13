const mongoose = require('mongoose');

let produtoSchema = mongoose.Schema({
    idProduto: {
        type: mongoose.Schema.Types.ObjectId
    },
    nome: {
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
    },

    qtdStock: {
        type: Number,
        required: [true, 'O campo qtdStock é obrigatorio']
    }
    
});

module.exports = mongoose.model('produto', produtoSchema);
