const db = require("../config/db");
const bcrypt = require("bcryptjs");

const USERS_COLLECTION = "users";

// ✅ Register user (auto-generated Firestore ID)
async function createUser({ name, email, password, role = "user" }) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userRef = db.collection(USERS_COLLECTION).doc(); // auto-ID
  const userData = {
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await userRef.set(userData);

  return { id: userRef.id, ...userData };
}

// ✅ Find user by email (for login)
async function findUserByEmail(email) {
  const snapshot = await db
    .collection(USERS_COLLECTION)
    .where("email", "==", email)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

// ✅ Check password (login)
async function checkPassword(user, enteredPassword) {
  return bcrypt.compare(enteredPassword, user.password);
}

module.exports = {
  createUser,
  findUserByEmail,
  checkPassword,
};
