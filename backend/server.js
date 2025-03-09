require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const transferRoutes = require("./routes/transferRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

// Use API routes
app.use("/api", transferRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
