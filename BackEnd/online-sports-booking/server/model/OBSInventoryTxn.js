const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    inventoryID : {
        type : String,
        required: true
    },
    qty : String,
    purchaseDate : String,
    returnDate : String,
    CreatedBy:String,
    Created:Date,
    ModifiedBy:String,
    Modified:Date
})

const OBSInventoryTxn = db.model('OBSInventoryTxn', schema);

module.exports = OBSInventoryTxn;