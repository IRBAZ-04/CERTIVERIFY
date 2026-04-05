const express = require('express');
const router = express.Router();
const {
    uploadCertificates,
    createCertificate,
    getCertificates,
    verifyCertificate,
    getStudentPortfolio,
    shareCertificate,
    ocrVerify,
    getAnalytics,
    updateCertificate,
    deleteCertificate
} = require('../controllers/certificateController');
const { protect, requireAdmin } = require('../middlewares/authMiddleware');
const uploadExcel = require('../middlewares/uploadMiddleware');
const uploadImage = require('../middlewares/imageUploadMiddleware');

// Analytics (must be before /:id routes)
router.get('/analytics', protect, requireAdmin, getAnalytics);

// AI Fraud OCR (public — anyone can scan)
router.post('/ocr', uploadImage.single('image'), ocrVerify);

// Public verification routes
router.get('/verify/:id', verifyCertificate);
router.get('/student/:name', getStudentPortfolio);

// Protected CRUD
router.route('/')
    .get(protect, requireAdmin, getCertificates)
    .post(protect, requireAdmin, createCertificate);

router.post('/upload', protect, requireAdmin, uploadExcel.single('file'), uploadCertificates);

router.route('/:id')
    .put(protect, requireAdmin, updateCertificate)
    .delete(protect, requireAdmin, deleteCertificate);

// Share via email
router.post('/:id/share', protect, requireAdmin, shareCertificate);

module.exports = router;
