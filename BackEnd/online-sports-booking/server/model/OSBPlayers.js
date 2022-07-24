const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    PlayerName : {
        type : String,
        required: true
    },
    Status : String,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OSBPlayers = db.model('OSBPlayers', schema);

module.exports = OSBPlayers;