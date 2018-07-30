module.exports = (router, config) => {
  router.get('/health', (req, res) => {
    res.status(200).send('Can u see me? ^ - ^');
  });
}