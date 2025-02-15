const mongoose = require('mongoose');

const otpVerificationSchema = new mongoose.Schema({
    phonenumber: { type: Number, required: true },
    otp: { type: Number, required: true },
    otpValidUntil: { type: Date, required: true },
});

module.exports = mongoose.model('otp', otpVerificationSchema);