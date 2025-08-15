const jwt = require("jsonwebtoken");
// If you prefer online verification, you can import axios and call AUTH_SERVICE_URL

module.exports = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.substring(7) : null;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // Offline/local verification using shared secret (HS256)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Example: simple RBAC check (optional)
    // if (req.method !== 'GET' && req.user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};
