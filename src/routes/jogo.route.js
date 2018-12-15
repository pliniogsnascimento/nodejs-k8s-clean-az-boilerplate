const jogoController = require('../controllers/jogo.controller');

module.exports = app => {
  app.get('/api/v1/jogos', (req, res) => {
    const controller = new jogoController();
    controller.getAllJogos(req, res);
  });  

  app.get('/api/v1/jogos/:id', (req, res) => {
    const controller = new jogoController();
    controller.getJogoByID(req, res);
  });

  app.post('/api/v1/jogos', (req, res) => {
    const controller = new jogoController();
    controller.postJogo(req, res);
  });

  app.patch('/api/v1/jogos/:id', (req, res) => {
    const controller = new jogoController();
    controller.updateJogo(req, res);
  });

  app.delete('/api/v1/jogos/:id', (req, res) => {
    const controller = new jogoController();
    controller.deleteJogo(req, res);
  });
}

