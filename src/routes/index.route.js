const express = require('express');
const players = require('./players.route');

const notFoundController = require('../controllers/notfound.controller');
const router = express.Router();

router.use('/players', players);

router.get('/', (req, res) => res.send('Sample Node API Version1'));

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