const mongoose = require("mongoose");

const certSchema = new mongoose.Schema({
  name: String,
  certId: { type: String, unique: true, required: true, trim: true },
  course: String,
  date: String
});

module.exports = mongoose.model("Certificate", certSchema);
