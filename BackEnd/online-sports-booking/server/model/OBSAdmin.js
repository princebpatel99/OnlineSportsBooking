const mongoose = require('mongoose');
const db = require('../database/connection')

var schema = new mongoose.Schema({
    fullName : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    mobile : String,
    password : String
})

const OSBAdmin = db.model('OSBAdmin', schema);

module.exports = OSBAdmin;