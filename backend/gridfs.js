const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let gridFSBucket = null;

// Function to initialize GridFS
const initializeGridFS = () => {
  if (mongoose.connection.readyState === 1) {  // 1 = connected
    gridFSBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
    console.log('✅ GridFSBucket initialized');
  } else {
    console.error('❌ MongoDB not connected. GridFS initialization failed.');
  }
};

// Ensure GridFS initializes after MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected, initializing GridFS...');
  initializeGridFS();
});

const getGridFSBucket = () => {
  if (!gridFSBucket) {
    console.warn('⚠️ GridFSBucket not initialized. Trying to initialize...');
    initializeGridFS();
  }
  return gridFSBucket;
};

module.exports = { getGridFSBucket, initializeGridFS };
