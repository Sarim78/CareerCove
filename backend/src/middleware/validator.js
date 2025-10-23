/**
 * Input Validation Middleware
 * Validates and sanitizes user input
 */

const { body, validationResult } = require("express-validator")

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    })
  }
  next()
}

/**
 * Signup validation rules
 */
const validateSignup = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("email").trim().isEmail().withMessage("Please provide a valid email address").normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),

  body("fullName").optional().trim().isLength({ max: 100 }).withMessage("Full name must not exceed 100 characters"),

  handleValidationErrors,
]

/**
 * Login validation rules
 */
const validateLogin = [
  body("email").trim().isEmail().withMessage("Please provide a valid email address").normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidationErrors,
]

/**
 * Refresh token validation rules
 */
const validateRefreshToken = [
  body("refreshToken")
    .notEmpty()
    .withMessage("Refresh token is required")
    .isString()
    .withMessage("Refresh token must be a string"),

  handleValidationErrors,
]

module.exports = {
  validateSignup,
  validateLogin,
  validateRefreshToken,
  handleValidationErrors,
}
