const playersService = require('../services/players.service');

const get = function(req, res){
    try {
        const id = req.params.id;
        // If id is not a number then we cannot find a player
        if (Number.isNaN(Number.parseInt(id))) {
            res.statusCode = 422;
            res.send('Unprocessable entity');
        } else {
            const player = playersService.get(id);
            // If we found a player then we return it
            if (player) {
                res.send(player);
            } else {
                res.statusCode = 404;
                res.send('Player not found');
            }
        }    
    } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.send(error.message);
    }
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
        res.statusCode = error.statusCode || 500;
        res.send(error.message);
    }
    
}

const getMedian = function(req, res){
    try {
        res.send(playersService.getMedian());
    } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.send(error.message);
    }
    
}

module.exports = {
    get,
    getAll,
    getBestCountry,
    getIMC,
    getMedian
}