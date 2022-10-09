import { CountrySchema } from './country.model';
import { PlayerDataSchema } from './player-data.model';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    picture: String,
    sex: String,
    shortname: String,
    country: CountrySchema,
    data: PlayerDataSchema
});

