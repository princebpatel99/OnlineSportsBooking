const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    qty : Number,
    Invoice : String,
    DateOfPurchase : Date,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OSBInventory = db.model('OSBInventory', schema);

module.exports = OSBInventory;