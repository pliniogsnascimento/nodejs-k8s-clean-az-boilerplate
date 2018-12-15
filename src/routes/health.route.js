module.exports = router => {
  router.get('/', (req, res) => {
    res.status(200).send('Products service');
  });
  
  router.get('/health', (req, res) => {
    res.status(200).send('Service is alive!');
  });
}