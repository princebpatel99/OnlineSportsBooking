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
    password : String,
    gender:String,
    isVarified:Boolean,
    status:String,
    role:String
})

const OSBAdmin = db.model('OSBRegister', schema);

module.exports = OSBAdmin;