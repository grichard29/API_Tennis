    const data = require('../resources/headtohead.json');
const players = data.players;

const get = function(id){
    let player = getAll().find(player => player.id == id);
    return player ? player : 'Player not found';
}

const getAll = function() {
    return players.sort((x, y) => {
        return compare(x.data.rank, y.data.rank);
    });
}

const getIMC = function() {
    let IMCS = [];
    players.forEach(p => {
        let weightKG = p.data.weight / 1000;
        let heightM = p.data.height / 10;
        IMCS.push(weightKG / (heightM * heightM));
    });
    let sum = IMCS.reduce((sum, a) => sum + a, 0);
    return JSON.stringify(sum);
}

const getMedian = function() {
    let heights = [];
    players.forEach(p => {
        heights.push(p.data.height);
    });
    heights = heights.sort((a, b) => compare(a, b));
    if(heights.length % 2 == 0) {
        let index = heights.length / 2;
        let var1 = heights[index - 1];
        let var2 = heights[index];
        return JSON.stringify((var1 + var2) / 2);
    } else {
        let index = (heights.length + 1) / 2;
        // index - 1 because first index is 0
        return JSON.stringify(heights[index - 1]);
    }
}

const getBestCountry = function () {
    let dataByCountry = {};
    players.forEach((p) => {
        if (dataByCountry[p.country.code]) {
            dataByCountry[p.country.code].won += p.data.last.reduce((sum, a) => sum + a, 0);
            dataByCountry[p.country.code].played += p.data.last.length;
        } else {
            dataByCountry[p.country.code] = {
                won: p.data.last.reduce((sum, a) => sum + a, 0),
                played: p.data.last.length
            };
        }
    });
    let res;
    Object.keys(dataByCountry).forEach((code) => {
        let country = dataByCountry[code];
        country.code = code;
        if (!res) {
            res = country;
        } else if(country.won / country.played > res.won / res.played) {
            res = country;
        }
    });
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