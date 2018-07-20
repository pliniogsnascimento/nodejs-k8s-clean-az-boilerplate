const mongoose = require('mongoose');
const jogoM = require('../models/jogoModel');
const jogoModel = mongoose.model('jogo');
const jogoDAO = require('../DAO/jogoDAO');
const jsonValidator = require('../utils/jsonValidator');

module.exports.buscarJogos = (req, res) => {
//genero faixa etaria e valor plataforma
  
  let query = {};
  
  if (req.query.genero){
    query.genero = req.query.genero;
  }
  //esse ta dando erro
  if (req.query.classificacaoIndicativa){
    query.classificacaoIndicativa = req.query.classificacaoIndicativa;
  }
  if (req.query.preco){
    query.preco = req.query.preco;
  }
  if (req.query.plataforma){
    query.plataforma =  req.query.plataforma;
  }
 
 
  jogoDAO.buscarJogoDAO(query,(err, jogos) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if(jsonValidator.isEmpty(jogos[0])) {
        res.status(204).send();
      } else {

        let resp = {
          data: jogos,
          links: [
            {
              rel: 'self',
              href: req.path
            }
          ]
        }
  
        res.status(200).json(resp);
      }
    }
  });
}

module.exports.buscarJogoPeloId = (req, res) => {
  let id = { _id: req.params.id };
  jogoDAO.buscarJogoPorIdDAO(id, (err, jogos) => {
    if (err) {
      res.status(500).json(err)
    }
    else if (jogos !== null && jogos !== undefined) {

      let resp = {
        data: jogos,
        links: [
          {
            rel: 'self',
            href: req.path
          }
        ]
      }

      if(jogos.imagem) {
        resp.links.push({
          rel: 'imagem',
          href: '/static/' + jogos.imagem
        });
      }

      res.status(200).json(resp);
    } else {
      res.status(204).send();
    }
  });
}

module.exports.validarJogoExistente = (req, res, next) => {

  let id = { _id: req.params.id };

  jogoDAO.buscarJogoPorIdDAO(id, (err, jogos) => {
    if (err) {
      res.status(500).json(err);
    }
    else if (jogos !== null && jogos !== undefined) {
      next();
    } else {
      res.status(400).send();
    }
  });

}

module.exports.salvarJogo = (req, res) => {
  let jogo = new jogoM(req.body);
  jogoDAO.cadastraJogoDAO(jogo, (err, jogos) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if(jsonValidator.isEmpty(jogos)) {
        res.status(204).send();
      } else {
        res.status(201).json(jogos);
      }
    }
  });
}

module.exports.alterarJogo = (req, res) => {
    let jogosAtualizados = req.body;
    let id = { _id: req.params.id };
    jogoDAO.alteraJogoDAO(id, jogosAtualizados, (err, jogos) => {
        if (err) {
          console.log('Deu erro');
          console.log(err);
          res.status(500).json(err);
        } else {
          if(jsonValidator.isEmpty(jogos)) {
            res.status(204).send();
          } else {
          res.status(200).json(jogos);
        }
      }
    });
}

module.exports.removerJogo = (req, res) => {
  let id = { _id: req.params.id };
  jogoDAO.removerJogoDAO(id, (err, jogos) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if(jsonValidator.isEmpty(jogos)) {
        res.status(204).send();
      } else {
        res.status(200).json(jogos);
      }
    }
  })
}

module.exports.inserirArquivoImagem = (req, res) => {
  const imagem = req.file;

  let resp = {
    imagem: imagem,
    links: [
      {
        rel: 'self',
        href: req.path
      },
      {
        rel: 'imagem',
        href: '/static/' + imagem.filename
      },
      {
        rel: 'produto',
        href: '/api/v1/jogos/' + req.params.id,
      }
    ]
  }

  jogoDAO.alteraJogoDAO(req.params.id, { imagem: imagem.filename }, (jogo) => {
    res.status(200).json(resp);
  })


}
