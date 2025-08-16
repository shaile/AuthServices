require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const swaggerDocs = require("./swagger/swagger");

const app = express();
// ✅ Global unhandled rejection handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection:", reason);
  // Optionally exit the process:
  // process.exit(1);
});
app.use(express.json());

// Firestore doesn’t need connectDB() like Mongo, just ensure import works
console.log("✅ Firestore ready");

app.use("/api/auth", authRoutes);
swaggerDocs(app);

module.exports = app;
