const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    TeamName : {
        type : String,
        required: true
    },
    Status : String,
    Players : [{ type: mongoose.Schema.Types.ObjectId, ref: 'OSBPlayers' }],
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OBSListTeam = db.model('OBSListTeam', schema);

module.exports = OBSListTeam;