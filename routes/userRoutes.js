const express = require("express");
const router = express.Router();
const PDF = require("../models/PDF");

router.get("/", (req, res) => {
    res.json({ message: "User Route Working" });
});

router.get("/pdfs", async (req, res) => {
    try {
        const pdfs = await PDF.find().sort({ createdAt: -1 });
        res.json(pdfs);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
