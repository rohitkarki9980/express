const mongoose = require('mongoose')

const placesSchema = new mongoose.Schema({
    createPlace :{
        type:String,
        trim:true,
        require:true,
    }

},{timestamps:true})

module.exports = mongoose.model('places', placesSchema)