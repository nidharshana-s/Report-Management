const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadFile, getFile } = require('../controllers/fileController');
const { register, userLogin, otpVerification, getUserDetails} = require('../controllers/userController');

// Upload PDF or Image and create a report
//router.post('/upload', upload.single('file'), uploadFile);

router.post('/upload', upload.single('file'), uploadFile);


// Retrieve PDF or Image by ID
router.get('/file/:fileId', getFile);

//registeration
router.post('/register',register);

router.post('/login',userLogin);

router.post('/verify',otpVerification);

router.get('/details/:phno',getUserDetails);

module.exports = router;


