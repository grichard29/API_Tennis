const playersService = require('../services/players.service');

const get = function(req, res){
    res.send(playersService.get(req.params.id))
}

const getAll = function(req, res){
    res.send(playersService.getAll())
}

const getBestCountry = function(req, res){
    res.send(playersService.getBestCountry())
}

const getIMC = function(req, res, next){
    try {
        res.send(playersService.getIMC())
    } catch (error) {
        res.sendStatus(error.statusCode || 500).send(error.message);
    }
    
}

const getMedian = function(req, res){
    try {
        res.send(playersService.getMedian());
    } catch (error) {
        res.sendStatus(error.statusCode || 500).send(error.message);
    }
    
}

module.exports = {
    get,
    getAll,
    getBestCountry,
    getIMC,
    getMedian
}