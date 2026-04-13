const mongoose = require('mongoose');
const dotenv = require('dotenv');
const qrcode = require('qrcode');
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is required. Please set it in .env file.');
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
     console.log("Connected to DB.");
     const Certificate = require('./models/Certificate');
     
     await Certificate.deleteMany({ certId: "DEBUG-QR-11" });
     
     const { createCertificate, downloadCertificate } = require('./controllers/certificateController');
     
     const reqCreate = {
       body: {
         name: "QR Test User",
         certId: "DEBUG-QR-11",
         course: "QR Implementation",
         date: "2026-04-13"
       },
       get: () => "http://localhost:5173"
     };
     
     let createdCert = null;
     const resCreate = {
       status: (code) => ({
           json: (data) => {
               console.log("Create Status:", code, "Data:", data.certId ? "OK" : "FAIL");
               createdCert = data;
               return data;
           }
       }),
       json: (data) => { console.log(data); }
     };
     
     await createCertificate(reqCreate, resCreate);
     
     const savedCert = await Certificate.findOne({ certId: "DEBUG-QR-11" });
     console.log("QR Code saved in DB?:", !!(savedCert && savedCert.qrCode));
     if (savedCert && savedCert.qrCode) {
        console.log("QR Code base64 length:", savedCert.qrCode.length);
     }
     
     const reqDownload = {
         params: { id: "DEBUG-QR-11" },
         get: () => "http://localhost:5173"
     };
     
     let pdfData = null;
     const resDownload = {
         setHeader: (k, v) => {},
         end: (buffer) => {
             pdfData = buffer;
             console.log("PDF generated! Length in bytes:", buffer ? buffer.length : 0);
         },
         status: (code) => ({
             json: (data) => {
                 console.log("Download failed with status", code, "Message:", data.message);
             }
         }),
         headersSent: false
     };
     
     try {
        await downloadCertificate(reqDownload, resDownload);
     } catch (e) {
        console.error("error downloading:", e);
     }
     
     const fs = require('fs');
     if (pdfData) {
        fs.writeFileSync('DEBUG-QR-11.pdf', pdfData);
        console.log("Saved DEBUG-QR-11.pdf");
     }
     
     await mongoose.disconnect();
     console.log("Test OK");
     process.exit(0);
  }).catch(err => {
      console.error(err);
      process.exit(1);
  });
