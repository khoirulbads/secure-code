const express = require("express");
const router = express.Router();
const handler = require("../handlers/accountHandler");

router.post("/", handler.createAccount);
router.get("/", handler.getAllAccounts);
router.get("/:id", handler.getAccountById);
router.put("/:id", handler.updateAccount);
router.delete("/:id", handler.deleteAccount);

module.exports = router;
