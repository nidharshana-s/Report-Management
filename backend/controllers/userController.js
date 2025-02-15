const mongoose = require('mongoose');
const User = require('../models/User');
const otpSchema = require('../models/otpVerificationSchema');
const jwt = require("jsonwebtoken");
const Twilio = require("twilio");

require("dotenv").config();

const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const userLogin = async (req, res) => {
    try {
        const { phonenumber } = req.body;
        if (!phonenumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }
        else {
            const user = await User.findOne({phno:phonenumber });
            if (user) {
                const otpFind = await otpSchema.findOne({phonenumber });
                if (otpFind) {
                    await otpSchema.deleteOne();
                }
                const otp = Math.floor(1000 + Math.random() * 9000);
                const twilioClient = new Twilio(sid, token);
                
                await twilioClient.messages.create({
                    body: `Hospital Report Management, Your OTP for verification is ${otp}`,
                    from: twilioPhone,
                    to: "+91"+phonenumber,
                });

                const otpStore = new otpSchema({
                    phonenumber,
                    otp,
                    otpValidUntil: new Date(Date.now() + 5 * 60 * 1000),
                });
                await otpStore.save();
                return res.json({ message: "OTP sent successfully" });
            }
            else
            {
                return res.json({message: "No such user!"})
            }
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const otpVerification = async (req, res) => {
    try {
        const { phonenumber, otp } = req.body;
        if (!phonenumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }
        else if (!otp) {
            return res.status(400).json({ message: "OTP is required" });
        }
        const otpFind = await otpSchema.findOne({ phonenumber });
        const currentTime = new Date();
        if (otpFind.otpValidUntil < currentTime) {
            await otpFind.deleteOne();
            return res.status(400).json({ message: "OTP expired, retry login!!" });
        }  
        if (!otpFind) {
            return res.status(400).json({ message: "OTP not sent or already verified" });
        }
        else if (otp === otpFind.otp) {
            await otpFind.deleteOne();
            return res.status(200).json({ message: "OTP verified successfully" });
        }
        else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const register = async (req, res) => {
    try {
        console.log("Received registration request:", req.body);
        const { name, age, gender, phno, address } = req.body;

        if (!name || !age || !gender || !phno || !address) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const isUser = await User.findOne({ phno });
        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        const user = new User({ name, age, gender, phno, address });
        await user.save();
        console.log("User registered successfully:", user);
        return res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: true, message: "Server error", details: error.message });
    }
};

// const getUserDetails = async(req,res) => {

// }

module.exports = { register , userLogin , otpVerification};
