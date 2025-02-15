const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables


const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB at:", process.env.MONGODB_URI); // Debugging line
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is missing in .env");
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};


module.exports = connectDB;