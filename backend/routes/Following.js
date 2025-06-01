const express = require('express')
const User = require('../models/userSchema')
const follow_router = express.Router();
const token = require('../middlewares/token_middleware')



follow_router.post("/add" ,token , async (req,res)=>{

    try{
        
        const requestId = req.body.userId ; 
        const user_id = req.user.User_id ; 
         if (requestId === user_id) {
            return res.status(400).json({ message: "You cannot follow yourself." });
        }
        const user_details = await User.findOne({_id:user_id});

       if (!user_details.following.includes(requestId)) {
            user_details.following.push(requestId);
            await user_details.save(); 
            return res.status(200).json({ message: `Following the account` });
        }

        else{
            return res.status(200).json({
                message:"This Account is Already following by you"
            })
        }

       




    }
    catch(er){

      return  res.status(400).json({
        message:er
       })
    }

})


follow_router.post("/remove" , token , async(req,res)=>{

    try{

        const user_id = req.user.User_id;

        const unfollow_id =  req.body.userId ; 

        const user_details = await User.findOne({_id:user_id});

        if(!user_details){
             return res.status(400).json({
                message:"Current user not found"
             })
        }

        const index =  user_details.following.indexOf(unfollow_id);
        if(index ==-1){
           return  res.status(400).json({
                message:"Your not following this account.."
            })
        }

        user_details.following.splice(index,1);

        await user_details.save();
        
        return res.status(200).json({
            message:"Unfollowed Successfully "
        })


    }
    catch(er){
       return  res.status(400).json({
            message:er
        })
    }

})














module.exports = follow_router ; 