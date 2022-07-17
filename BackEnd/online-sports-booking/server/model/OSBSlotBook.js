const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    Date : {
        type : Date,
        required: true
    },
    From : String,
    To : String,
    GroundName : String,
    Sports:String,
    Status:String,
    BookBy:String,
    isTournament:Boolean,
    tournamentID:String,
    MatchId:String,
    totalPeople:Number,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OBSSlotBook = db.model('OBSSlotBook', schema);

module.exports = OBSSlotBook;