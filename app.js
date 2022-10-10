const express = require('express');
const http = require('http');
const cors = require('cors');

//setup app & its routes
const app = express();

app.use(cors());
const routes = require('./src/routes/index.route');
app.use(routes);

//start http server
const httpServer = http.createServer(app);

const port = 3000;

httpServer.listen(port);
console.log(`API http server listening at port ${port}`);

module.exports = { app };