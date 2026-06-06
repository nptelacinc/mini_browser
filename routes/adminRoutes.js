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

const upload = multer({
  storage: multer.memoryStorage()
});
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
    try {
console.log("UPLOAD HIT");
console.log("BODY DATA:");
console.log(req.body);

console.log("FILE DATA:");
console.log(req.file);
        console.log("FILE PATH =", req.file.path);
console.log("SECURE URL =", req.file.secure_url);
    if (!req.file) {
    console.log("FILE NOT FOUND");

    return res.status(400).json({
        success: false,
        message: "File Not Found"
    });
}
   console.log(req.file);

const pdf = new PDF({
    title: req.body.title,
    fileUrl: "test.pdf"
});
    await pdf.save();

    res.json({
        success: true,
        message: "PDF Uploaded"
    });

} catch (err) {

    console.log("UPLOAD ERROR");
   console.error(err);
console.error(err.message);
console.error(err.stack);

    res.status(500).json({
        success: false,
        message: err.message
    });

}

});
router.delete("/delete-pdf/:id", async (req, res) => {

    await PDF.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "PDF Deleted Successfully"
    });

});
module.exports = router;
