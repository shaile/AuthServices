const {
  createUser,
  findUserByEmail,
  checkPassword,
} = require("../models/auth.model");

/**
 * Register a new user
 */
async function registerUser({ name, email, password, role = "user" }) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = await createUser({ name, email, password, role });
  return newUser;
}

/**
 * Login user
 */
async function loginUser({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await checkPassword(user, password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Return safe user (no password)
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

module.exports = {
  registerUser,
  loginUser,
};
