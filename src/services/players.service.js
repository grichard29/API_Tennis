const data = require('../resources/headtohead.json');
const players = data.players;
const logger = require('../services/logger.service');

const get = function(id){
    const player = getAll().find(player => player.id == id);
    return player;
}

const getAll = function() {
    return players.sort((x, y) => {
        // We sort the players with according to their ranks from best to worst
        return compare(x.data.rank, y.data.rank);
    });
}

const getIMC = function() {
    let IMCS = [];
    players.forEach(p => {
        // We first convert weight in KG
        const weightKG = p.data.weight / 1000;
        // And height in meters
        const heightM = p.data.height / 10;

        // The we push the calculated IMC in the array
        IMCS.push(weightKG / (heightM * heightM));
    });
    // The we add all the collected IMCs
    const sum = IMCS.reduce((sum, a) => sum + a, 0);
    // And we calculate the mean
    const mean = sum / IMCS.length;
    logger.info(`Mean IMC calculated is : ${mean}`);
    return {data : mean};
}

const getMedian = function() {
    let heights = [];
    players.forEach(p => {
        heights.push(p.data.height);
    });
    heights = heights.sort((a, b) => compare(a, b));

    let median;
    
    if(heights.length % 2 == 0) {
        // IF the number of heights is even we calculate the mean height between (length/2) - 1 and length/2 (instead of n/2 and (n/2) + 1  because the first index is 0)
        const index = heights.length / 2;
        const var1 = heights[index - 1];
        const var2 = heights[index];
        
        median = (var1 + var2) / 2;
    } else {
        // Else the length is odd
        const index = (heights.length + 1) / 2;
        // index - 1 because first index is 0
        median = heights[index - 1];
    }
    logger.info(`Caluculated median : ${median}`);
    return {data: median};
}

const getBestCountry = function () {
    // variable to store data by country
    let dataByCountry = {};
    players.forEach((p) => {
        // if data for country code exists
        if (dataByCountry[p.country.code]) {
            dataByCountry[p.country.code].won += p.data.last.reduce((sum, a) => sum + a, 0);
            dataByCountry[p.country.code].played += p.data.last.length;
        } else {
            // init of the country's data
            dataByCountry[p.country.code] = {
                // Sum of the last won matches (array 'last' has 1 if the match is won and 0 if not)
                won: p.data.last.reduce((sum, a) => sum + a, 0),
                // length of the array represents all the played matches
                played: p.data.last.length
            };
        }
    });
    let res;
    // We loop on the countries to find the max ratio : won/played
    Object.keys(dataByCountry).forEach((code) => {
        const country = dataByCountry[code];
        country.code = code;
        if (!res) {
            res = country;
        } else if(country.won / country.played > res.won / res.played) {
            res = country;
        }
    });
    logger.info(`Country with best ratio ${res.code}`);
    return res;
}

const compare = function (a, b) {
    if (a > b) {
        return 1;
    }
    if (a < b) {
    return -1;
    }
    return 0;
}

module.exports = {
    get,
    getAll,
    getBestCountry,
    getIMC,
    getMedian
};