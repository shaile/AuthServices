require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const swaggerDocs = require("./swagger/swagger");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
swaggerDocs(app);

module.exports = app;
