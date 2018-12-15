module.exports = router => {
  router.get('/health', (req, res) => {
    res.status(200).send('Service is alive!');
  });
}