const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    mobileNo:{
        type: String,
        required: true
    },
    emailId:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);