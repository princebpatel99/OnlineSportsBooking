const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    capacity : Number,
    suitedFor : String,
    CreatedBy:String,
    Created:Date,
    ModifiedBy:String,
    Modified:Date
})

const OBSGround = db.model('OBSGround', schema);

module.exports = OBSGround;