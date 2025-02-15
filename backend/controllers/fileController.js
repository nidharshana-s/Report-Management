const { gridFSBucket } = require('../gridfs');
const Report = require('../models/Report');
const mongoose = require('mongoose');
const initializeGridFS = require('../gridfs');

// Upload PDF or Image and create a report
const uploadFile = async (req, res) => {
  console.log("Inside Uploadfile");
  console.log(req);
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const { type } = req.body; // Type of report (e.g., "Lab Report", "Scan Report")

  if (!type) {
    return res.status(400).json({ message: 'Report type is required' });
  }

  if (!gridFSBucket) {
    initializeGridFS();
  }

  // Upload file to GridFS
  const uploadStream = gridFSBucket.openUploadStream(req.file.originalname);
  uploadStream.end(req.file.buffer);

  uploadStream.on('finish', async () => {
    try {
      // Create a new report in the Reports collection
      const report = new Report({
        type,
        report: uploadStream.id, // Link the uploaded file to the report
      });

      await report.save();
      return res.status(200).json({ message: 'File uploaded and report created', reportId: report._id });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to create report', error: err });
    }
  });

  uploadStream.on('error', (err) => {
    console.log(err)
    return res.status(500).json({ message: 'File upload failed', error: err });
  });
};

// Retrieve PDF or Image by ID
const getFile = (req, res) => {
  const { fileId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    return res.status(400).json({ message: 'Invalid file ID' });
  }

  const downloadStream = gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
  downloadStream.on('error', (err) => {
    return res.status(404).json({ message: 'File not found' });
  });
  res.set('Content-Type', 'application/pdf'); // Adjust content type for images if needed
  downloadStream.pipe(res);
};

module.exports = { uploadFile, getFile };