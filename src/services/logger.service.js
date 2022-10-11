const pino = require('pino');
const fs = require('fs');
const pinoms = require('pino-multi-stream');

const streams = [
    { stream: process.stdout },
    { stream: fs.createWriteStream('logs/logger.log', { flags: 'a' }) },
];

const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};
module.exports = pino(
    {
        level: 'http',
        customLevels: levels
    },
    pinoms.multistream(streams)
);