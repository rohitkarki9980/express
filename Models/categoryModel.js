const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    Category_name:{
        type:String,
        trim:true,
        required:true,

    }
},{timestamps:true});
module.exports = mongoose.model('Category',categorySchema);