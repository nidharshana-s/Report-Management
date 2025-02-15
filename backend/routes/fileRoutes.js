const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadFile, getFile } = require('../controllers/fileController');

// Upload PDF or Image and create a report
//router.post('/upload', upload.single('file'), uploadFile);

router.post('/upload', upload.single('file'), uploadFile);


// Retrieve PDF or Image by ID
router.get('/file/:fileId', getFile);

module.exports = router;


