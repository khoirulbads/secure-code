const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const accountRoutes = require("./routes/accountRoutes");

// Middleware
app.use(express.json());

// Route sederhana
app.get("/", (req, res) => {
  res.send("Hello World!  Express.js is running");
});
app.use("/api/account", accountRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`service running in http://localhost:${PORT}`);
});
