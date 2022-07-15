const mongoose = require('mongoose');

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
    city : String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;