import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export const generateCertificatePDF = async (certData) => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    // Background color
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, 297, 210, 'F');

    // Outer Border
    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);

    // Inner Border
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, 267, 180);

    // Title
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(40);
    doc.text('CERTIFICATE OF COMPLETION', 148.5, 50, { align: 'center' });

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text('This is proudly presented to', 148.5, 75, { align: 'center' });

    // Student Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(79, 70, 229);
    doc.text(certData.studentName.toUpperCase(), 148.5, 95, { align: 'center' });

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text(`For successfully completing the program in`, 148.5, 115, { align: 'center' });

    // Domain
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text(certData.domain, 148.5, 130, { align: 'center' });

    // Dates
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const startDate = new Date(certData.startDate).toLocaleDateString();
    const endDate = new Date(certData.endDate).toLocaleDateString();
    doc.text(`from ${startDate} to ${endDate}`, 148.5, 145, { align: 'center' });

    // Details & Verification URL
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Certificate ID: ${certData.certificateId}`, 30, 180);
    doc.text(`Issued On: ${new Date(certData.issueDate).toLocaleDateString()}`, 30, 186);

    try {
        const verifyUrl = `${window.location.origin}/verify?id=${certData.certificateId}`;
        const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
            width: 100,
            margin: 1,
            color: {
                dark: '#1e293b',
                light: '#ffffff'
            }
        });
        doc.addImage(qrDataUrl, 'PNG', 240, 160, 30, 30);

        // Scan text
        doc.setFontSize(8);
        doc.text('Scan to Verify', 244, 194);
    } catch (err) {
        console.error('Error generating QR code', err);
    }

    doc.save(`${certData.certificateId}_${certData.studentName.replace(/ /g, '_')}.pdf`);
};
