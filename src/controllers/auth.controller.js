const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../services/auth.service");

/**
 * Register controller
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerUser({ name, email, password, role });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Login controller
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser({ email, password });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
