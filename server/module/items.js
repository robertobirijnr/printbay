const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    artist:{
        type:String
    },
    image:{
        type:String
    },
    year:{
        type:Number
    },
    Price:{
        Number
    }
})

module.exports = mongoose.model('Item',itemSchema)