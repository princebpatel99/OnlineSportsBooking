const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    noOfPlayers : {
        type : Date,
        required: true
    },
    category : String,
    contact : String,
    status : String,
    CreatedBy:String,
    Created:Date,
    ModifiedBy:String,
    Modified:Date
})

const OBSGame = db.model('OBSGame', schema);

module.exports = OBSGame;