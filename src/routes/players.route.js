const express = require('express');
const router = express.Router({ mergeParams: true });

const playersController = require('../controllers/players.controller');

router.route('/best-country')
    .get(playersController.getBestCountry);

router.route('/imc')
    .get(playersController.getIMC);

router.route('/median')
    .get(playersController.getMedian);

router.route('/')
    .get(playersController.getAll);

router.route('/:id')
    .get(playersController.get);

module.exports = router;