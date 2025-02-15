const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 1, max: 120 },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    phno: { type: String, required: true, match: /^[0-9]{10}$/ }, // 10-digit phone number
    address: { type: String, required: true, trim: true },
  });

module.exports = mongoose.model('User', UserSchema);