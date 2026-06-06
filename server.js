const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", adminRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// Static Files
app.use(express.static(__dirname));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Routes
const userRoutes = require("./routes/userRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

app.use("/api/users", userRoutes);
app.use("/api/pdfs", pdfRoutes);

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
