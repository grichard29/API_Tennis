
const notfound = function(req, res){
    res.sendStatus(404);
    res.type('txt').send('Not found');
}

module.exports = {
    notfound,
}