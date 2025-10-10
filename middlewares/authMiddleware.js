const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "bni_secret_key"
    );
    req.user = decoded; // simpan payload ke request
    next();
  } catch (err) {
    console.error("Invalid token", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
