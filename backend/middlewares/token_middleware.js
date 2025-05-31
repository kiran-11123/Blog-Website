const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const twilio = require('twilio')
dotenv.config();

const secretKey = process.env.secretKey ; 

function Authenticate_Token(req,res,next){

     try{

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) return res.status(400).json({message:"Token is required"})

        jwt.verify(token,secretKey,(err,user)=>{
             if (err) return res.status(403).json({ message: 'Invalid token' });
             console.log(user);
              req.user = user; 
              next();
        })
     }

     catch(er){
          console.log(er)
         res.json({
                  message:"Token failed to validate"
     });

     }
}

module.exports = Authenticate_Token;