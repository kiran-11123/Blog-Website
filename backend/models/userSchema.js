const mongoose = require('mongoose')
const express = require('express')


const Userschema  = new mongoose.Schema({
    
    username:{type:String , unique:true , required:true},
    email : {type:String , unique:true , required:true},
    mobile : {type:String , unique:true , required:true},
    password:{type:String , required:true},
    profile:{type:String},
    bio:{type:String},
    following :  [{type:mongoose.Schema.Types.ObjectId , ref:'User'} ],
    followers : [{type:mongoose.Schema.Types.ObjectId , ref:'User'} ],
    

})

const User = mongoose.model("User_Details" , Userschema);


module.exports = User ; 