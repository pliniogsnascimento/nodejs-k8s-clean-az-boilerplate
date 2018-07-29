//  const upload = require('../utils/multer');
  const jogoController = require('../controllers/jogo.controller');
  
  module.exports = (router,config) => {
  router.get('/jogos', (req, res) => {
    jogoController.buscarJogos(req, res);
  });

  //retorna jogo
  router.get('/jogos/:id', (req, res) => {
  
  });

  //insere jogo
  router.post('/jogos', (req, res) => {
  
  });

  //atualiza jogo
  router.patch('/jogos/:id', (req, res) => {
   
  });

  //remove jogo
  router.delete('/jogos/:id', (req, res) => {
    
  });

  //Middleware para checar se arquivo existe
  router.patch('/jogos/:id/imagens', (req, res, next) => {
    
  });

  router.patch('/jogos/:id/imagens', upload.single('imagem'), (req, res) => {
    
  });

}

