const express = require('express');
const players = require('./players.route');
const playersController = require('../controllers/players.controller');
const notFoundController = require('../controllers/notfound.controller');
const router = express.Router();

router.route('/v1/best-ratio-country')
    .get(playersController.getBestCountry);

router.route('/v1/mean-imc')
    .get(playersController.getIMC);

router.route('/v1/height-median')
    .get(playersController.getMedian);

router.use('/v1/players', players);

router.get('/', (req, res) => res.send('Sample Node API Version 1'));

router.get('/health', (req, res) => {
  const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
  };
  res.send(JSON.stringify(healthcheck));
});

router.route('*').get(notFoundController.notfound);

module.exports = router;