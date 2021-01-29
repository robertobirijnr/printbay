const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')
const jwt = require('jsonwebtoken')
const config = require('../config/db')
const bcrypt = require("bcryptjs")

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
    if(this.token){
        return this.token
    }
    const token = jwt.sign(
        {_id: this._id.toHexString()},
        config.JWT_SECRETE
    ).toString()
    this.token = token;
    await this.save()
    return token;
}

userSchema.statics.findByToken = async function(token){
    try {
        const {_id} = jwt.verify(token,config.JWT_SECRETE);
        return this.findOne({_id,token});
    } catch (err) {
        throw err
    }
}

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        try {
            this.password = await bcrypt.hash(this.password,10)
            next()
        } catch (err) {
            next(err)
        }
    }else{
        next()
    }
})

userSchema.statics.findByCredentials = async function(email,password){
    const user = await this.findOne({email})
    if(!user){
        throw{
            errors:{
                email:{
                    message:"User not found"
                }
            }
        }
    }else{
       if(await bcrypt.compare(password,user.password)){
        return user
       }else{
        throw{
            errors:{
                email:{
                    message:"Incorrect email or password"
                }
            }
        }
       }
    }
}

module.exports = mongoose.model('user',userSchema)