const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerDataSchema = new Schema({
    age: Number,
    height: Number,
    points: Number,
    rank: Number,
    weight: Number,
    last: [Boolean],
});