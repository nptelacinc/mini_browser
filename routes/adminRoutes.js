const express = require("express");
const router = express.Router();
const multer = require("multer");
const PDF = require("../models/PDF");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return res.json({
            success: true,
            message: "Admin Login Successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid Username or Password"
    });

});

router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {

    const pdf = new PDF({
        title: req.body.title,
        fileUrl: "/uploads/" + req.file.filename
    });

    await pdf.save();

    res.json({
        success: true,
        message: "PDF Uploaded"
    });

});

module.exports = router;
