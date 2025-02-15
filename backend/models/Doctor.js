const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phno: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model('Doctor', DoctorSchema);