const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: "client"
    },
    isVerified: {
        type: Boolean,
        default: false
    }

},{timestamp: true})

module.exports = mongoose.model("User", userSchema)