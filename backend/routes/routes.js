const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/userSchema')
const secretKey = require('../config')



router.post("/signin" , async(req,res)=>{
     

    try{
        const {email , password} = req.body;

        const fetchdetails = await User.findOne({'email':email})
        if(!fecthdetails) 
        {
            return res.status(200).json({
                message:"Email didn't Exist ."
            })
        }

        const passcheck = await bcrypt.compare(passcheck , fetchdetails.password);

        if(!passcheck){
            return res.json({
                message:"Password Didn't match"
            })
        }

        const tokendetails = {firstName:fetchdetails.firstName , lastName:fetchdetails.lastName , email:fetchdetails.email , mobile:fetchdetails.mobile, User_id : fetchdetails._id}

        const token = jwt(tokendetails , secretKey ,{expiresIn:'1h'})

        return res.json({
            message:"Login Successfull.",
            token
        })
    
    
    }
    catch(er){
        return res.status(400).json({
            message:"Server Error"
        })
    }


})