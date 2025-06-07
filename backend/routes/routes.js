const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const User = require('../models/userSchema')
const secretKey = process.env.secretKey
const token = require('../middlewares/token_middleware')

const signup_routes = require('./signup_routes')
router.use("/signup" , signup_routes)

const suggestions_route = require('./Friend_Suggestions')
router.use("/suggestions" , suggestions_route);


const follow = require('./Following')
router.use("/follow" , follow);


const data = require('./Content')
router.use("/content",data)


const AddorRemove = require('./DataAddorRemove')
router.use("/add-data",AddorRemove)




router.post("/token" , token , (req,res)=>{
   res.json({ message: 'Protected route accessed!', user: req.user });

})





router.post("/signin" , async(req,res)=>{
     

    try{
        const {email , password} = req.body;

        const fetchdetails = await User.findOne({email:email})
        if(!fetchdetails) 
        {
            return res.status(200).json({
                message:"Email didn't Exist ."
            })
        }

        const passcheck = await bcrypt.compare(password , fetchdetails.password);

        if(!passcheck){
            return res.json({
                message:"Password Didn't match"
            })
        }

        const tokendetails = {username:fetchdetails.username , email:fetchdetails.email , mobile:fetchdetails.mobile, User_id : fetchdetails._id}

        const token = jwt.sign(tokendetails , secretKey ,{expiresIn:'1h'})

        return res.json({
            message:"Login Successfull.",
            token:token
        })
    
    
    }
    catch(er){
        console.log(er)
        return res.status(400).json({
            message:"Server Error"
        })
    }


})



router.put("/update",token , async(req,res)=>{

    try{

        const userId = req.user.User_id ; 

        const alldetails = {};

        if(req.body.username !==null){
            alldetails.username = req.body.username;
        }

        if(req.body.email !==null){
            alldetails.email = req.body.email;
        }

        if(req.body.mobile !==null){
            alldetails.mobile = req.body.mobile;
        }

        if(req.body.password !==null){

            const hashed_password = bcrypt.hash(password , 10)
            alldetails.password = hashed_password;
        }

         
        if(req.body.bio !==null){
            alldetails.bio = req.body.bio;
        }

        if(req.body.profile !==null){
            alldetails.profile = req.body.profile;
        }


        const update_details = await User.findByIdAndUpdate(userId , alldetails , {new:true});

        return res.status(200).json({
            message:"User Details Uploaded Successfully"
        })


    }

    catch(er){

        return res.json({
            message:"Server Error"
        })
    }


})




router.get("/all_details" , token , async(req,res)=>{


    try{

        const user_id = req.user.User_id;

        const user_details = await User.findOne({_id:user_id})

        if(!user_details){
            return res.status(400).json({
                message:"User not found"
            })
        }

        return res.status(200).json({
            user_details
        })

    }
    catch(er){

        return res.status(400).json({
            message:er
        })
    }
})
module.exports = router