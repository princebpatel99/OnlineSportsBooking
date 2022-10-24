const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    noOfPlayers : {
        type : Number,
        required: true
    },
    category : String,
    contact : String,
    status : String,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
});

const OBSGame = db.model('OBSGame', schema);

module.exports = OBSGame;