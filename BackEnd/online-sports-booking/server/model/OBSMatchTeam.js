const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    teamOneId : {
        type : String,
        required: true
    },
    teamOneName : String,
    teamTwoId : String,
    teamTwoName : String,
    tournamentId:String,
    tournamentName:String,
    result:String,
    CreatedBy:String,
    Created:Date,
    ModifiedBy:String,
    Modified:Date
})

const OBSMatchTeam = db.model('OBSMatchTeam', schema);

module.exports = OBSMatchTeam;