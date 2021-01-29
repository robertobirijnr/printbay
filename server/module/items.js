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
        data: Buffer,
        contentType: String
    },
    year:{
        type:Number
    },
    price:{
        type:Number
    }
},{
    toJSON:{
        transform:(doc, {_id,title,image,year,price,artist}) =>({
           id: _id,title,image,year,price,artist
        })
    }
})

module.exports = mongoose.model('Item',itemSchema)