const express = require('express')
const mongoose = require('mongoose')
const User = require('./userSchema');


const UploadSchema  = new mongoose.Schema({
    
    user_id:{type:mongoose.Types.ObjectId , ref:'User' , required:true},
    text:{
        type:String,
        default:null
    },

    image:{

        type:{
        fileName:String,
        fileType:String,
        fileData:Buffer,

        },

        default:null

    },

    video:{

        type:{
        fileName:String,
        fileType:String,
        fileData:Buffer,

        },
        default:null
    },

     createdAt:{
        type:Date,
        default:Date.now()
     }


})


const Upload = mongoose.model('Uploads' , UploadSchema);



module.exports = Upload;



