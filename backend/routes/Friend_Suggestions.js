const express = require('express');
const { ModuleDataInstance } = require('twilio/lib/rest/marketplace/v1/moduleData');
const friend_router = express.Router();
const User = require('../models/userSchema')

const token = require('../middlewares/token_middleware')


friend_router.get("/friends",token , async(req,res)=>{
     
    try{

        const userID = req.user.User_id ;
        
        const fetchUser = await User.findOne({_id:userID});

        if(!fetchUser){
            return res.status(400).json({
                message:"User Not Found"
            })
        }

        const followingIDS = (fetchUser.following || []).map(id => id.toString());

        const suggestions  =await  User.find({
            _id:{
                $nin:[...followingIDS , userID]
            }
        }).select('_id username profile');

        console.log("Suggestions:", suggestions);

        
        res.json(suggestions);              

    }

    catch(er){
        console.log(er)
        return res.status(400).json({
            message:er
        })
    }
    
})


module.exports = friend_router ; 