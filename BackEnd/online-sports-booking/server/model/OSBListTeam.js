const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    tournamentId : {
        type : String,
        required: true
    },
    tournamentName : String,
    teamName : String,
    playerName : String,
    status:String,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OBSListTeam = db.model('OBSListTeam', schema);

module.exports = OBSListTeam;