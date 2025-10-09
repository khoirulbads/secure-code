const express = require("express");
require("dotenv").config();
const app = express();
const accountRoutes = require("./routes/accountRoutes");

app.use(express.json());
app.use("/api/account", accountRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!  Express.js is running");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
