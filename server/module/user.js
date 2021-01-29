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
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    }
},{
    toJSON:{
        transform:(doc, {_id,name,email,role}) =>({
            _id,name,email,role
        })
    }
});

//Generating user token for authentication
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

//Hashing user password
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

//Validating user
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

//Adding user role 
userSchema.pre('save',async function(next){
    if(this.isModified('role') && this.role === 'admin'){
      const user = await this.constructor.find({role:'admin'});
      if(user.length >= 1){
          next(new Error("Only one admin user can be add"))
      }else{
          next()
      }
    }else{
        next()
    }
})

module.exports = mongoose.model('user',userSchema)