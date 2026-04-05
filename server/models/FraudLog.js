const mongoose = require('mongoose');

const fraudLogSchema = new mongoose.Schema({
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    certificateId: { type: String }, // Optional, the ID that was searched/verified
    type: { type: String, enum: ['OCR_MISMATCH', 'DUPLICATE_ID', 'INVALID_SIGNATURE', 'ANOMALY_DETECTED'], required: true },
    details: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('FraudLog', fraudLogSchema);
