
const notfound = function(req, res){
    res.sendStatus(404);
    res.type('txt').send('Route not found');
}

module.exports = {
    notfound,
}