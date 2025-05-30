const express = require('express')
const mongoose = require('mongoose')

const  ConnectDb = async()=>{


    try{

        await mongoose.connect("mongodb://localhost:27017/",{

         useNewUrlParser: true,
         useUnifiedTopology: true

    })

    console.log("Database connected successfully");
 
    }

    catch(e){
        console.log("Error connecting the database" , e);
    }

   
}


module.exports = ConnectDb ; 