const mongoose = require('mongoose');
const db = require('../database/connection');

var schPlayers = new mongoose.Schema({
    PlayerName: String,
    Status: String,
    CreatedBy: Object,
    Created: Date,
    ModifiedBy: Object,
    Modified: Date
});

var schTeam = new mongoose.Schema({
    TeamName: String,
    Status: String,
    CreatedBy: Object,
    Player:[schPlayers],
    Created: Date,
    ModifiedBy: Object,
    Modified: Date
});

var schTimeTable = new mongoose.Schema({
    teamOne: schTeam,
    teamTwo: schTeam,
    ground:String,
    StartDate:Date,
    EndDate:Date,
    WinningTeam:schTeam,
    CreatedBy: Object,
    Created: Date,
    ModifiedBy: Object,
    Modified: Date
});

var schema = new mongoose.Schema({
    TournamentName: {
        type: String,
        required: true
    },
    Sport: Object,
    startDate: Date,
    endDate: Date,
    team:[schTeam],
    schedule:[schTimeTable],
    CreatedBy: Object,
    Created: Date,
    ModifiedBy: Object,
    Modified: Date
})

const OBSTournament = db.model('OBSTournament', schema);

module.exports = OBSTournament;