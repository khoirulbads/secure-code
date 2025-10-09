const Joi = require("joi");

const createAccountSchema = Joi.object({
  accountName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Account name cannot be empty",
    "string.min": "Account name must be at least 3 characters long",
    "any.required": "Account name is required",
  }),

  accountNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(8)
    .max(20)
    .required()
    .messages({
      "string.pattern.base": "Account number must contain only digits",
      "string.min": "Account number must be at least 8 digits",
      "string.max": "Account number cannot exceed 20 digits",
      "any.required": "Account number is required",
    }),

  customerId: Joi.string().alphanum().min(3).required().messages({
    "string.alphanum": "Customer ID must be alphanumeric",
    "string.min": "Customer ID must be at least 3 characters",
    "any.required": "Customer ID is required",
  }),

  accountType: Joi.string()
    .valid("SAVING", "CURRENT", "DEPOSIT")
    .required()
    .messages({
      "any.only": "Account type must be one of SAVING, CURRENT, or DEPOSIT",
      "any.required": "Account type is required",
    }),

  initialBalance: Joi.number().min(0).required().messages({
    "number.base": "Initial balance must be a number",
    "number.min": "Initial balance cannot be negative",
    "any.required": "Initial balance is required",
  }),
});

module.exports = { createAccountSchema };
