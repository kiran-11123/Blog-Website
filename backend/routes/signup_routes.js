const express = require('express');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()
const User = require('../models/userSchema')
const router_signup = express.Router();
const otpStore = {}
const twilio = require('twilio')
const token = require('../middlewares/token_middleware');
const { validateRequestWithBody } = require('twilio/lib/webhooks/webhooks');

/* 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const OTP_Generator = async (mobile) => {
    const otp = Math.floor(1000 + Math.random() * 9000);

  

    try {
        await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: from,
        to: `+91${mobile}`
    });
    return otp;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('OTP failed to send');
    }
};


*/ 

router_signup.post("/user" , async(req,res)=>{

    try{

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
            alldetails.password = req.body.password;
        }


        if(!alldetails.mobile || alldetails.mobile.length!==10){
            return res.status(400).json({
                message:"Invalid Mobile Number"
            })
        }
        
    
        const userCheck = await User.findOne({email:alldetails.email})

        if(userCheck){
            return res.status(200).json({
                message:"Email already Exists"
            })
        }

        
        /* try{

            const otp =await  OTP_Generator(mobile)

            otpStore[mobile] = {
                otp,
                expiresAt:Date.now()+5*60*1000,
                firstName,
                lastName,
                email,
                password
            };

            res.status(200).json({
                
                message:"OTP Sent to the Mobile Successfully"
            })

        }
        catch(er){
            console.log(er)
            res.json({
                
                message:"OTP failed to send"
            })
        }  */ 


        const hashed_password = await bcrypt.hash(alldetails.password,10);

        const new_User =await  new User({
            username:alldetails.username , email : alldetails.email , mobile : alldetails.mobile ,password : hashed_password 
        })

        new_User.save();

        return res.status(200).json({
           message:"User Account Created Successfully "
        })


    } 

    catch(er){
   
        return res.json({
            message:er
        })
    } 
})


/* 
router_signup.post("/signup/verify-otp"  , async (req,res)=>{


    const {mobile , otp} = req.body;

    const stored = otpStore[mobile];

    if(!stored){
        return res.status(400).json({
            message:"No OTP request found for this number"
        })
    }

    if(Date.now() > stored.expiresAt){
        delete otpStore[mobile];
        return res.json({
            message:"OTP has expire"
        })
    }

    if(parseInt(otp) !== stored.otp){
          
        return res.json({
            message:"Invalid OTP"
        })
    }

    try{

        const firstName = stored.firstName ;
        const lastName = stored.lastName;
        const email = stored.email;
        const mobile = mobile;
        const password = stored.password;

        const hashed_password = await bcrypt.hash(password,10);

        const new_User =await  new User({
            firstName:firstName , lastName:lastName , email:email , mobile:mobile , password:hashed_password
        })

        new_User.save();

        res.status(200).json({
           message:"User Account Created Successfully "
        })
    }
    catch(er){
        res.status(400).json({
            message:"Server Error"
        })
    }

})

*/ 
module.exports = router_signup ; 