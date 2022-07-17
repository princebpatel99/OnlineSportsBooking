const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    capacity : Number,
    suitedFor : String,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OBSGround = db.model('OBSGround', schema);

module.exports = OBSGround;