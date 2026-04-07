const Certificate = require('../models/Certificate');
const xlsx = require('xlsx');
const PDFDocument = require('pdfkit');

const uploadCertificates = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

        const workbook = xlsx.readFile(req.file.path);
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        let inserted = 0;
        let rejected = 0;

        for (let row of data) {
            if (!row.CertificateID) {
                rejected++;
                continue;
            }

            try {
                await Certificate.create({
                    name: row.Name,
                    certId: row.CertificateID,
                    course: row.Course,
                    date: row.Date
                });
                inserted++;
            } catch (err) {
                rejected++;
            }
        }

        res.json({ message: "Uploaded successfully", summary: { inserted, rejected } });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const createCertificate = async (req, res) => {
    try {
        const { name, certId, course, date } = req.body;
        if (!name || !certId || !course) return res.status(400).json({ message: "Missing fields" });

        const newCert = await Certificate.create({ name, certId, course, date });
        res.status(201).json(newCert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getCertificates = async (req, res) => {
    try {
        const certs = await Certificate.find({});
        res.json(certs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const verifyCertificate = async (req, res) => {
    try {
        const cert = await Certificate.findOne({ certId: req.params.id });

        if (!cert) return res.json({ valid: false });

        res.json({ valid: true, cert });
    } catch (err) {
        res.status(500).json({ valid: false, message: "Error looking up certificate" });
    }
};

const downloadCertificate = async (req, res) => {
    try {
        const cert = await Certificate.findOne({ certId: req.params.id });
        if (!cert) return res.status(404).json({ message: "Not found" });

        // 1. Set response headers FIRST
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(cert.certId)}.pdf"`);

        // 2. Create PDF document
        const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });

        // 3. Pipe document to response
        doc.pipe(res);

        // 4. Add content (text, layout, certificate details)
        doc.fontSize(44).text('Certificate of Completion', { align: 'center' });
        doc.moveDown();
        doc.fontSize(22).text('This is to certify that', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(32).fillColor('#0284c7').text(cert.name, { align: 'center' });
        doc.fillColor('black');
        doc.moveDown(0.5);
        doc.fontSize(20).text('has successfully completed the course', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(26).text(cert.course, { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(16).text(`Date: ${cert.date}`, { align: 'center' });
        doc.fontSize(12).text(`Certificate ID: ${cert.certId}`, { align: 'center' });

        // 5. Finalize document: MUST call .end() to finalize stream and response
        doc.end();

    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        } else {
            console.error('Error during PDF streaming:', err);
            res.end();
        }
    }
};

module.exports = {
    uploadCertificates,
    createCertificate,
    getCertificates,
    verifyCertificate,
    downloadCertificate
};
