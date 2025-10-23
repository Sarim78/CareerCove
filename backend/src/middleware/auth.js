/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */

const { verifyAccessToken } = require("../utils/tokenUtils")

/**
 * Middleware to authenticate JWT access tokens
 */
const authenticateToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1] // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      })
    }

    // Verify token
    const decoded = verifyAccessToken(token)

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token",
      })
    }

    // Attach user ID to request object
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Failed to authenticate token",
    })
  }
}

/**
 * Optional authentication middleware
 * Continues even if token is invalid, but attaches user if valid
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (token) {
      const decoded = verifyAccessToken(token)
      if (decoded) {
        req.userId = decoded.userId
      }
    }
    next()
  } catch (error) {
    next()
  }
}

module.exports = {
  authenticateToken,
  optionalAuth,
}
