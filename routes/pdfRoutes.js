const express = require("express");
const router = express.Router();
const PDF = require("../models/PDF");

router.get("/", async (req, res) => {
    try {
        const pdfs = await PDF.find();
        res.json(pdfs);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
