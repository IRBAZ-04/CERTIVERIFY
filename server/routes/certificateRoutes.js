const express = require('express');
const router = express.Router();
const {
    uploadCertificates,
    createCertificate,
    getCertificates,
    verifyCertificate,
    downloadCertificate
} = require('../controllers/certificateController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temp folder

router.get('/verify/:id', protect, verifyCertificate);
router.get('/download/:id', protect, downloadCertificate);

router.route('/')
    .get(protect, adminOnly, getCertificates)
    .post(protect, adminOnly, createCertificate);

router.post('/upload', protect, adminOnly, upload.single('file'), uploadCertificates);

module.exports = router;
