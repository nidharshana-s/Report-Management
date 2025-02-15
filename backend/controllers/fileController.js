const mongoose = require('mongoose');
//const { ObjectId } = require('mongodb');
const { getGridFSBucket, initializeGridFS } = require('../gridfs');
const Report = require('../models/Report'); // Ensure this path is correct

// ✅ UPLOAD FILE FUNCTION
const uploadFile = async (req, res) => {
  console.log("📤 Uploading file...");

  if (!req.file) {
    console.log("❌ No file received!");
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { type } = req.body;
  if (!type) {
    console.log("❌ Report type missing!");
    return res.status(400).json({ message: 'Report type is required' });
  }

  let gridFSBucket = getGridFSBucket();
  if (!gridFSBucket) {
    console.warn('⚠️ GridFSBucket was undefined, initializing...');
    initializeGridFS();
    gridFSBucket = getGridFSBucket();
  }

  if (!gridFSBucket) {
    console.error('❌ GridFSBucket failed to initialize.');
    return res.status(500).json({ message: 'GridFSBucket is not initialized' });
  }

  console.log("✅ File received:", req.file.originalname);

  try {
    const uploadStream = gridFSBucket.openUploadStream(req.file.originalname);
    uploadStream.end(req.file.buffer);



    await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });

    console.log("🎉 File uploaded successfully! File ID:", uploadStream.id);

    // ✅ Save report reference in database
    const report = new Report({ type, report: uploadStream.id.toString() });
    await report.save();
    console.log("📝 Report created:", report._id);

    return res.status(200).json({
      message: 'File uploaded and report created',
      reportId: report._id
    });

  } catch (err) {
    console.error("🔥 Error in uploadFile:", err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// ✅ GET FILE FUNCTION
// const getFile = async (req, res) => {
//   const { fileId } = req.params;
//   console.log(typeof(fileId))

//   // ✅ Validate ObjectId before querying
//   if (!mongoose.Types.ObjectId.isValid(fileId)) {
//     return res.status(400).json({ message: 'Invalid file ID' });
//   }

//   let gridFSBucket = getGridFSBucket();
//   if (!gridFSBucket) {
//     console.warn('⚠️ GridFSBucket was undefined, initializing...');
//     initializeGridFS();
//     gridFSBucket = getGridFSBucket();
//   }

//   try {
//     const filesCollection = mongoose.connection.db.collection('uploads.files');
//     const file = await filesCollection.findOne({ _id: new ObjectId(fileId) });

//     if (!file) {
//       console.error("❌ File not found in database:", fileId);
//       return res.status(404).json({ message: 'File not found' });
//     }

//     console.log(`📄 Streaming file ${file.filename} (ID: ${fileId})...`);

//     res.setHeader('Content-Type', file.contentType || 'application/octet-stream');
//     res.setHeader('Content-Disposition', 'inline');

//     const downloadStream = gridFSBucket.openDownloadStream(new ObjectId(fileId));

//     downloadStream.on('error', (err) => {
//       console.error("🔥 Error streaming file:", err);
//       return res.status(500).json({ message: 'Error streaming file', error: err.message });
//     });

//     downloadStream.pipe(res);
//   } catch (error) {
//     console.error("🔥 Error retrieving file:", error);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// const getFile = (req, res) => {
//   const { fileId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(fileId)) {
//     return res.status(400).json({ message: 'Invalid file ID' });
//   }

//   const downloadStream = gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
//   downloadStream.on('error', (err) => {
//     return res.status(404).json({ message: 'File not found' });
//   });
//   res.set('Content-Type', 'application/pdf');
//   downloadStream.pipe(res);
// };

// const getFile = (req, res) => {
//   const { fileId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(fileId)) {
//     return res.status(400).json({ message: 'Invalid file ID' });
//   }

//   let gridFSBucket = getGridFSBucket();
//   if (!gridFSBucket) {
//     console.warn('⚠️ GridFSBucket was undefined, initializing...');
//     initializeGridFS();
//     gridFSBucket = getGridFSBucket();
//   }

//   if (!gridFSBucket) {
//     return res.status(500).json({ message: 'GridFSBucket is not initialized' });
//   }

//   const downloadStream = gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

//   downloadStream.on('error', (err) => {
//     console.error("🔥 Error streaming file:", err);
//     return res.status(404).json({ message: 'File not found' });
//   });

//   res.set('Content-Type', 'application/pdf');
//   downloadStream.pipe(res);
// };

const getFile = async (req, res) => {
  const { fileId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    return res.status(400).json({ message: 'Invalid file ID' });
  }

  let gridFSBucket = getGridFSBucket();
  if (!gridFSBucket) {
    initializeGridFS();
    gridFSBucket = getGridFSBucket();
  }

  try {
    const filesCollection = mongoose.connection.db.collection('uploads.files');
    const file = await filesCollection.findOne({ _id: new mongoose.Types.ObjectId(fileId) });

    if (!file) {
      console.error("❌ File not found in database:", fileId);
      return res.status(404).json({ message: 'File not found in database' });
    }

    console.log(`📄 Streaming file ${file.filename} (ID: ${fileId})...`);

    res.setHeader('Content-Type', file.contentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', 'inline');

    const downloadStream = gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    downloadStream.on('error', (err) => {
      console.error("🔥 Error streaming file:", err);
      return res.status(500).json({ message: 'Error streaming file', error: err.message });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("🔥 Error retrieving file:", error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



module.exports = { uploadFile, getFile };
