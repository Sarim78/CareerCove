const { body, validationResult } = require("express-validator")

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    })
  }
  next()
}

// Registration validation rules
const validateRegistration = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  body("fullName").trim().isLength({ min: 2, max: 100 }).withMessage("Full name must be between 2 and 100 characters"),
  validate,
]

// Login validation rules
const validateLogin = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
]

// Refresh token validation rules
const validateRefresh = [body("refreshToken").notEmpty().withMessage("Refresh token is required"), validate]

module.exports = {
  validateRegistration,
  validateLogin,
  validateRefresh,
}
