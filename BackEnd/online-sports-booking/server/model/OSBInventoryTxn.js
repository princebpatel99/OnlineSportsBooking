const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    inventoryID : {
        type : String,
        required: true
    },
    qty : String,
    purchaseDate : Date,
    returnDate : Date,
    CreatedBy:Object,
    Created:Date,
    ModifiedBy:Object,
    Modified:Date
})

const OBSInventoryTxn = db.model('OBSInventoryTxn', schema);

module.exports = OBSInventoryTxn;