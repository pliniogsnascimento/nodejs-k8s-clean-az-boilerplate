const jogoController = require('../controllers/jogo.controller');
const upload = require('../utils/multer');
module.exports = (app, repository) => {

    const controller = new jogoController(repository)

    app.get('/api/v1/jogos', (req, res) => {
        controller.getAllJogos(req, res);
    });

    
    app.get('/api/v1/jogos/:id', (req, res) => {
        controller.getJogoByID(req, res);
    });

    //insere jogo
    app.post('/api/v1/jogos', (req, res) => {
        controller.postJogo(req, res);
    });

    //atualiza jogo
    app.patch('/api/v1/jogos/:id', (req, res) => {
        controller.updateJogo(req, res);
    });

    //remove jogo
    app.delete('/api/v1/jogos/:id', (req, res) => {
        controller.deleteJogo(req, res);
    });

    //Middleware para checar se arquivo existe
    app.patch('/api/v1/jogos/:id/imagens', (req, res, next) => {
        controller.checkExistence(req, res, next);
    });


    app.post('api/v1/jogos/:id/imagens', upload.single('imagem'), (req, res) => {
        controller.insertImage(req,res);
    });

}

