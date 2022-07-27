const mongoose = require('mongoose');
const db = require('../database/connection')

var txn = new mongoose.Schema({
    qty : Number,
    purchaseDate : Date,
    returnDate : Date,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
});
var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    qty : Number,
    Invoice : String,
    DateOfPurchase : Date,
    transaction : [txn],
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OSBInventory = db.model('OSBInventory', schema);

module.exports = OSBInventory;