
const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    FromDate : Date,
    ToDate : Date,
    FromTime:String,
    ToTime:String,
    GroundName : String,
    Sports:String,
    Status:String,
    BookBy:String,
    isTournament:Boolean,
    tournamentID:String,
    totalPeople:Number,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OBSSlotBook = db.model('OBSSlotBook', schema);

module.exports = OBSSlotBook;