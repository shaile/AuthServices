const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role }, // include role here
    process.env.JWT_SECRET || "your_jwt_secret_here",
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = generateToken;
