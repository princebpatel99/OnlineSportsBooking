const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    TournamentName : {
        type : String,
        required: true
    },
    Sport : String,
    noOfTeam : Number,
    dateOfTournament : Date,
    CreatedBy:String,
    Created:Date,
    ModifiedBy:String,
    Modified:Date
})

const OBSTournament = db.model('OBSTournament', schema);

module.exports = OBSTournament;