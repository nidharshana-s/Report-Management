const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let gridFSBucket;

const initializeGridFS = () => {
  gridFSBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'healthcare', // Collection name for files
  });
  console.log('GridFSBucket initialized:', gridFSBucket);
};

mongoose.connection.once('open', () => {
  initializeGridFS();
});

module.exports = { gridFSBucket, initializeGridFS };