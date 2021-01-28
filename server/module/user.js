const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')
const jwt = require('jsonwebtoken')
const config = require('../config/db')

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
    },
    token:{
        type:String
    }
},{
    toJSON:{
        transform:(doc, {_id,name,email}) =>({
            _id,name,email
        })
    }
});

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign(
        {_id: this._id.toHexString()},
        config.JWT_SECRETE
    ).toString()
    this.token = token;
    await this.save()
    return token;
}

module.exports = mongoose.model('user',userSchema)