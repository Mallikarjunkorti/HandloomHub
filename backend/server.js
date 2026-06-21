const userRoutes = require("./routes/users");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orders");

// Routes
const productRoutes = require("./routes/products");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("HandloomHub Backend Running 🚀");
});

// Product Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
console.log("Users route loaded");
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});