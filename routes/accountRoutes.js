const express = require("express");
const router = express.Router();
const accountHandler = require("../handler/accountHandler");

// // Endpoint untuk create account
router.post("/create", accountHandler.createAccount);

module.exports = router;
