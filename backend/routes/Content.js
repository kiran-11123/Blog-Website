const express = require('express')
const ContentRouter = express.Router();
const token = require('../middlewares/token_middleware')
const Upload = require('../models/UploadData')
const User = require('../models/userSchema');
const { default: mongoose } = require('mongoose');


//to display the posts of the user
ContentRouter.get("/myposts",token , async(req,res)=>{
   
    try{

        const UserId = req.user.User_id;

        const userdetails = await Upload.find({user_id:UserId});

        if(!userdetails || userdetails.length===0){
            return res.json({
                message:"No Posts found"
            })
        }

        
    const formattedPosts=[]
    for(let i=0;i<userdetails.length;i++){

        let imageBase64 = null;

        if(userdetails[i].image && userdetails[i].image.fileData){
            imageBase64 = userdetails[i].image.fileData.toString('base64')
        }

        let videoBase64 = null;

        if(userdetails[i].video && userdetails[i].video.fileData){
            videoBase64 = userdetails[i].video.fileData.toString('base64');
        }
        
         

        formattedPosts.push({
            post_id:userdetails[i]._id,
            text:userdetails[i].text,
            image:imageBase64 ? `data:${userdetails[i].image.fileType};base64,${imageBase64}`:null,
            video:videoBase64 ?`data:${userdetails[i].video.fileType};base64,${videoBase64}`:null,
            createdAt:userdetails[i].createdAt

        })


    }

    return res.status(200).json({myposts:formattedPosts})


    }
    catch(er){
        return res.json({
            message:"Server error",
            error:er
        })
    }
 


})


// to display all the following data in homepage
ContentRouter.get('/data',token , async(req,res)=>{

    const userId = req.user.User_id;
    
    const userdetails = await Upload.find({user_id:{$ne :new mongoose.Types.ObjectId(userId)}})

    console.log(userdetails)

    if(!userdetails){
        return res.status(400).json({
            message:"Nothing to Display "
        })
    }
  
    const formattedPosts=[]
    for(let i=0;i<userdetails.length;i++){

        let imageBase64 = null;

        if(userdetails[i].image && userdetails[i].image.fileData){
            imageBase64 = userdetails[i].image.fileData.toString('base64')
        }

        let videoBase64 = null;

        if(userdetails[i].video && userdetails[i].video.fileData){
            videoBase64 = userdetails[i].video.fileData.toString('base64');
        }
        

        formattedPosts.push({
            user_id :userdetails[i].user_id,
            post_id:userdetails[i]._id,
            text:userdetails[i].text,
            image:imageBase64 ? `data:${userdetails[i].image.fileType};base64,${imageBase64}`:null,
            video:videoBase64 ?`data:${userdetails[i].video.fileType};base64,${videoBase64}`:null,
            createdAt:userdetails[i].createdAt

        })


    }

    return res.status(200).json({posts:formattedPosts})


})














module.exports = ContentRouter ; 