const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://singhsonam8415:xEY0f6hiNU8bzMOW@cluster0.dwoyiv5.mongodb.net/"
    ); // No extra options needed
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit if DB fails
  }
};

module.exports = connectDB;
