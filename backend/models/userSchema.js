const mongoose = require('mongoose')
const express = require('express')


const Userschema  = new mongoose.Schema({
    
    firstName :{type:String ,required},
    lastName : {type:String , required},
    email : {type:String , unique:true , required},
    mobile : {type:Number , unique:true , required}

})

const User = mongoose.model("UserDetails" , Userschema);


module.exports = User ; 