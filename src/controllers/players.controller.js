const playersService = require('../services/players.service');
const logger = require('../services/logger.service');

const get = function(req, res){
    logger.info('GET player with its id');
    try {
        const id = req.params.id;
        // If id is not a number then we cannot find a player
        if (Number.isNaN(Number.parseInt(id))) {
            res.statusCode = 422;
            res.send('Unprocessable entity');
            logger.error('422 Invalid id');
        } else {
            const player = playersService.get(id);
            // If we found a player then we return it
            if (player) {
                res.send(player);
                logger.info('200 Player found');
            } else {
                res.statusCode = 404;
                res.send('Player not found');
                logger.error('404 Player not found');
            }
        }    
    } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.send(error.message);
        logger.error('500 Server error');
    }
}

const getAll = function(req, res){
    try {
        logger.info('200 GET List of players');
        res.send(playersService.getAll());
    } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.send(error.message);
        logger.error('500 Server error');
    }
}

const getBestCountry = function(req, res){
    try {
        logger.info('200 GET Country with best win ratio');
        res.send(playersService.getBestCountry());
    } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.send(error.message);
        logger.error('500 Server error');
    }
}

const getIMC = function(req, res, next){
    try {
        logger.info('200 GET Mean IMC of players');
        res.send(playersService.getIMC())
    } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.send(error.message);
        logger.error('500 Server error');
    }
    
}

const getMedian = function(req, res){
    try {
        logger.info('200 GET Height median of players');
        res.send(playersService.getMedian());
    } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.send(error.message);
        logger.error('500 Server error');
    }
    
}

module.exports = {
    get,
    getAll,
    getBestCountry,
    getIMC,
    getMedian
}