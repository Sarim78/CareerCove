const express = require("express")
const AuthController = require("../controllers/authController")
const { authenticateToken } = require("../middleware/auth")
const { authLimiter } = require("../middleware/rateLimiter")
const { validateRegistration, validateLogin, validateRefresh } = require("../middleware/validator")

const router = express.Router()

// Public routes
router.post("/register", authLimiter, validateRegistration, AuthController.register)
router.post("/login", authLimiter, validateLogin, AuthController.login)
router.post("/refresh", validateRefresh, AuthController.refresh)
router.post("/logout", AuthController.logout)

// Protected routes
router.get("/profile", authenticateToken, AuthController.getProfile)

module.exports = router
