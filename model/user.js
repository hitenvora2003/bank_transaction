const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: [true, "this email already exits,please differentOne"],
    },
    password: {
        type: String,
        required: [true, "please enter your password"],

    },

})
module.exports = mongoose.model('user', userschema)