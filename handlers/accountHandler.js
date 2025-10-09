// handlers/accountHandler.js
const db = require("../config/db");
const { createAccountSchema } = require("../validators/accountValidators");

exports.createAccount = async (req, res) => {
  try {
    const { error, value } = createAccountSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        status: "FAILED",
        message: "Validation error",
        errors: error.details.map((d) => d.message),
      });
    }

    const {
      accountName,
      accountNumber,
      customerId,
      initialBalance,
      accountType,
    } = value;

    const sql = `INSERT INTO accounts
      (account_name, account_number, customer_id, account_type, initial_balance)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, account_name AS "accountName", account_number AS "accountNumber", customer_id AS "customerId", account_type AS "accountType", initial_balance AS "initialBalance", created_at AS "createdAt"`;

    const { rows } = await db.query(sql, [
      accountName,
      accountNumber,
      customerId,
      accountType,
      initialBalance,
    ]);
    return res.status(201).json({
      status: "SUCCESS",
      message: "Account created successfully",
      data: rows[0],
    });
  } catch (err) {
    console.error("createAccount error", err);
    // handle unique violation nicely (Postgres error code 23505)
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ status: "FAILED", message: "Account number already exists" });
    }
    return res
      .status(500)
      .json({ status: "ERROR", message: "Internal server error" });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const sql = `SELECT id, account_name AS "accountName", account_number AS "accountNumber", customer_id AS "customerId", account_type AS "accountType", initial_balance AS "initialBalance", created_at AS "createdAt" FROM accounts ORDER BY id DESC`;
    const { rows } = await db.query(sql);
    return res.json({ status: "SUCCESS", data: rows });
  } catch (err) {
    console.error("getAllAccounts error", err);
    return res
      .status(500)
      .json({ status: "ERROR", message: "Internal server error" });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res.status(400).json({ status: "FAILED", message: "Invalid id" });
    }

    const sql = `SELECT id, account_name AS "accountName", account_number AS "accountNumber", customer_id AS "customerId", account_type AS "accountType", initial_balance AS "initialBalance", created_at AS "createdAt" FROM accounts WHERE id = $1`;
    const { rows } = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Account not found" });
    }

    return res.json({ status: "SUCCESS", data: rows[0] });
  } catch (err) {
    console.error("getAccountById error", err);
    return res
      .status(500)
      .json({ status: "ERROR", message: "Internal server error" });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res.status(400).json({ status: "FAILED", message: "Invalid id" });
    }

    // reuse same schema (require full body). You can adapt for partial patch.
    const { error, value } = createAccountSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        status: "FAILED",
        message: "Validation error",
        errors: error.details.map((d) => d.message),
      });
    }

    const {
      accountName,
      accountNumber,
      customerId,
      initialBalance,
      accountType,
    } = value;

    const sql = `UPDATE accounts
                 SET account_name=$1, account_number=$2, customer_id=$3, account_type=$4, initial_balance=$5
                 WHERE id=$6 RETURNING id`;
    const { rowCount } = await db.query(sql, [
      accountName,
      accountNumber,
      customerId,
      accountType,
      initialBalance,
      id,
    ]);

    if (rowCount === 0) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Account not found" });
    }

    return res.json({
      status: "SUCCESS",
      message: "Account updated successfully",
    });
  } catch (err) {
    console.error("updateAccount error", err);
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ status: "FAILED", message: "Account number already exists" });
    }
    return res
      .status(500)
      .json({ status: "ERROR", message: "Internal server error" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res.status(400).json({ status: "FAILED", message: "Invalid id" });
    }

    const { rowCount } = await db.query("DELETE FROM accounts WHERE id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Account not found" });
    }

    return res.json({ status: "SUCCESS", message: "Account deleted" });
  } catch (err) {
    console.error("deleteAccount error", err);
    return res
      .status(500)
      .json({ status: "ERROR", message: "Internal server error" });
  }
};
