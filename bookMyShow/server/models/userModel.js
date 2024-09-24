const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin','partner'],
        required:true,
        default:'user'
    },

    //Net fields to take care of otp
    otp:{
        type:String,
    },
    otpExpiry:{
        type:Date,
    }
})

module.exports = mongoose.model('users',userSchema);
