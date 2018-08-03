const upload = require('../utils/multer');
const jogoController = require('../controllers/jogo.controller');

module.exports = (app, repository) => {

    app.get('/jogos', (req, res) => {
        jogoController.getAllJogos(req, res, repository);
    });

    //retorna jogo
    app.get('/jogos/:id', (req, res) => {
        jogoController.getJogoByID(req, res, repository);
    });

    //insere jogo
    app.post('/jogos', (req, res) => {
        jogoController.postJogo(req, res, repository);
    });

    //atualiza jogo
    app.patch('/jogos/:id', (req, res) => {
        jogoController.updateJogo(req, res, repository);
    });

    //remove jogo
    app.delete('/jogos/:id', (req, res) => {
        jogoController.deleteJogo(req, res, repository);
    });

    //Middleware para checar se arquivo existe
    app.patch('/jogos/:id/imagens', (req, res, next) => {

    });


    app.patch('/jogos/:id/imagens', upload.single('imagem'), (req, res) => {

    });

}

