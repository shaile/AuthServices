// db.js (Firestore version)
const { Firestore } = require("@google-cloud/firestore");

// Initialize Firestore client
const db = new Firestore();

console.log("✅ Firestore connected successfully");

module.exports = db;
