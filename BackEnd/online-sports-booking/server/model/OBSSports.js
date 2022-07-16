const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    Title : {
        type : String,
        required: true
    },
    CreatedBy:String,
    Created:Date,
    ModifiedBy:String,
    Modified:Date
})

const OBSSports = db.model('OBSSports', schema);

module.exports = OBSSports;