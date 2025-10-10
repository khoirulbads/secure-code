const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// simulasi database user
const users = [];

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || "bni_secret_key",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
