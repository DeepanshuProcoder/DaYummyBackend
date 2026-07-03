const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./config/db");
require("dotenv").config();
const profileRoutes = require("./routes/profileRoutes");
const couponRoutes = require("./routes/couponRoutes")
const settingsRoutes = require("./routes/settingsRoutes");
const contactRoutes = require("./routes/contactRoutes");

console.log("Settings Routes:", settingsRoutes)
dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Backend Running Successfully");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/profile", profileRoutes);
const PORT = process.env.PORT || 5000;


const productRoutes=require("./routes/productRoutes");

app.use(

    "/api/coupons",couponRoutes);
app.use("/api/products",productRoutes);
app.use("/api/settings", settingsRoutes);
app.use(

"/uploads",


express.static("uploads"));
app.use(

    "/api/settings",

    settingsRoutes

);
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});