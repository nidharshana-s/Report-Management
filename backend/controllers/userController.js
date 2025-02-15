const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async(req,res) => {
    console.log(req.body);
    const {name,age,gender,phno,address} = req.body;
    const isUser = await User.findOne({phno:phno});
    if(!name){
        return res.status(400).json({error: true, message:"Name is required"});
    }
    if(!age){
        return res.status(400).json({error: true, message:"Age is required"});
    }
    if(!gender){
        return res.status(400).json({error: true, message:"Gender is required"});
    }
    if(!phno){
        return res.status(400).json({error: true, message:"Phone number is required"});
    }
    if(!address){
        return res.status(400).json({error: true, message:"Address is required"});
    }
    if(isUser){
        return res.status(400).json({
            error: true,
            message: "User already exists",
        })
    }
    const user = new User({name,age,gender,phno,address});
    await user.save();
    console.log("USer details:kmwcklnkndvcm");
    console.log(user);
    return res.json(user);
}

module.exports={register};