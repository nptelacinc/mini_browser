const express = require("express");
const router = express.Router();
const multer = require("multer");
const PDF = require("../models/PDF");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "vk-pdfs",
        resource_type: "raw"
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
console.log("UPLOAD HIT");
console.log(JSON.stringify(req.body));
console.log(JSON.stringify(req.file));
    const pdf = new PDF({
        title: req.body.title,
      fileUrl: req.file.path
    });

    await pdf.save();

    res.json({
        success: true,
        message: "PDF Uploaded"
    });

});
router.delete("/delete-pdf/:id", async (req, res) => {

    await PDF.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "PDF Deleted Successfully"
    });

});
module.exports = router;
