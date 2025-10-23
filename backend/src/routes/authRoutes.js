/**
 * Authentication Routes
 * Defines all authentication-related endpoints
 */

const express = require("express")
const AuthController = require("../controllers/authController")
const { authenticateToken } = require("../middleware/auth")
const { signupLimiter, loginLimiter } = require("../middleware/rateLimiter")
const { validateSignup, validateLogin, validateRefreshToken } = require("../middleware/validator")

const router = express.Router()

// Public routes
router.post("/signup", signupLimiter, validateSignup, AuthController.signup)
router.post("/login", loginLimiter, validateLogin, AuthController.login)
router.post("/refresh", validateRefreshToken, AuthController.refreshToken)

// Protected routes (require authentication)
router.get("/profile", authenticateToken, AuthController.getProfile)
router.post("/logout", authenticateToken, AuthController.logout)

module.exports = router
