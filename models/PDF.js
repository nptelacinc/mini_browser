const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    title: String,
    fileUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("PDF", pdfSchema);
