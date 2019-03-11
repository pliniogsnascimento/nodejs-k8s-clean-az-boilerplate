const { Router } = require('express');



module.exports = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.status(200).send('Products service');
  });
  
  router.get('/health', (req, res) => {
    res.status(200).send('Service is alive!');
  });

  return router;
}