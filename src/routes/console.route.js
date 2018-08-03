const upload = require('../utils/multer');
const jogoController = require('../controllers/jogo.controller');
const ConsoleController = require('../controllers/console.controller')

module.exports = (app,repository) => {

  app.get('/jogos', (req, res) => {
  jogoController.getAllGames(req, res, repository);
});

//retorna jogo
app.get('/jogos/:id', (req, res) => {
  jogoController.getGameByID(req, res, repository);
});

//insere jogo
app.post('/jogos', (req, res) => {

});

//atualiza jogo
app.patch('/jogos/:id', (req, res) => {
 
});

//remove jogo
app.delete('/jogos/:id', (req, res) => {
  
});

//Middleware para checar se arquivo existe
app.patch('/jogos/:id/imagens', (req, res, next) => {
  
});


app.patch('/jogos/:id/imagens', upload.single('imagem'), (req, res) => {
  
});

}

