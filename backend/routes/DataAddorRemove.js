const express =require('express')
const mongoose = require('mongoose')
const User = require('../models/userSchema')
const upload = require('../models/UploadData');
const AddorRemove_Router = express.Router();
const token = require('../middlewares/token_middleware')
const multer = require('multer')
const storage = multer.memoryStorage();
const UploadData = multer({storage:storage})



AddorRemove_Router.post("/add",token,UploadData.fields([
    {name:'image',maxCount:1},{name:'video',maxCount:1}
]),async(req,res)=>{

    try{

        const userId  =  req.user.User_id;

        const {text } = req.body;

        const toUpload = {
            user_id:userId,
            text:text ||null,
            image:null,
            video:null
        };


        if(req.files['image'] && req.files['image'][0]){
            const img = req.files['image'][0]

            toUpload.image={
                fileName:img.originalname,
                fileType:img.mimetype,
                fileData:img.buffer
            }
        }

        if(req.files['video'] && req.files['video'][0]){
            const video = req.files['video'][0];


            toUpload.video ={
                fileName:video.originalname,
                fileType:video.mimetype,
                fileData:video.buffer
            }
        }

        const newPost =  new upload(toUpload);

        await newPost.save();

        return res.status(200).json({
            message:"Upload Successful",
            
        })

       


    }
    catch(er){
        return res.json({
            message:"Server Error",
            error:er
        })
    }
})




AddorRemove_Router.delete("/remove" , async(req,res)=>{

    try{

        const { post_id } = req.body;
      
        const find_post = await upload.findOne({_id:post_id})

        console.log(find_post)

        if(!find_post) {
            return res.status(400).json({
                message:"Post not Found"
            })
        }

        await upload.findByIdAndDelete(post_id);
       
        return res.status(200).json({
            message:"Post Deleted Successfully"
        })


    }
    catch(er){
        return res.json({
            message:"Server Error",
            error:er
        })
    }
})














module.exports = AddorRemove_Router;

