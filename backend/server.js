const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config(); // Load environment variables
const { gridFSBucket, initializeGridFS } = require('./gridfs');
const mongoose = require('mongoose');


const app = express();

// Connect to MongoDB
connectDB();

mongoose.connection.once('open', () => {
  initializeGridFS();
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', fileRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});