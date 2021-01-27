const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:6,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:{
            validator:validator.isEmail,
                message:"{VALUE} is not a valid email"
            
        }
    },
    password:{
        type:String,
        required:String,
        minlength:6,
        trim:true
    }
})

module.exports = mongoose.model('user',userSchema)