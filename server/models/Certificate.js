const mongoose = require('mongoose');

const certificateUpdateSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String }
}, { _id: false });

const certificateSchema = new mongoose.Schema({
    certificateId: { type: String, required: true, unique: true, index: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    domain: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    issueDate: { type: Date, default: Date.now },
    qrCodeData: { type: String },
    blockchainHash: { type: String },
    status: { type: String, enum: ['VALID', 'REVOKED'], default: 'VALID' },
    versionHistory: [certificateUpdateSchema]
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
