const logger = require('../services/logger.service');

const notfound = function(req, res){
    res.sendStatus(404);
    res.type('txt').send('Route not found');
    logger.error('404 Route not found');
}

module.exports = {
    notfound,
}