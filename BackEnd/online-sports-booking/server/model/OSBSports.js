const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    Title : {
        type : String,
        required: true
    },
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OBSSports = db.model('OBSSports', schema);

module.exports = OBSSports;