const mongoose = require("mongoose");

const certSchema = new mongoose.Schema({
  name: String,
  certId: String,
  course: String,
  date: String
});

module.exports = mongoose.model("Certificate", certSchema);
