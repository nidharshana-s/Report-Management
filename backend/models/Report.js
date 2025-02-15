const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  ReportDate: { type: Date, default: Date.now },
  type: { type: String },
  report: { type: mongoose.Schema.Types.ObjectId, ref: 'healthcare.files' }, // Reference to PDF file in GridFS
  scan: { type: mongoose.Schema.Types.ObjectId, ref: 'healthcare.files' }, // Reference to image file in GridFS
});

module.exports = mongoose.model('Report', ReportSchema);