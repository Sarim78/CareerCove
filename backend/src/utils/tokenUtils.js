/**
 * JWT Token Utilities
 * Functions for generating and verifying JWT tokens
 */

const jwt = require("jsonwebtoken")

// Token expiry times
const ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_EXPIRY || "15m"
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d"

/**
 * Generate access token
 * Short-lived token for API requests
 */
const generateAccessToken = (userId) => {
  return jwt.sign({ userId, type: "access" }, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY })
}

/**
 * Generate refresh token
 * Long-lived token for obtaining new access tokens
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId, type: "refresh" }, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY })
}

/**
 * Verify access token
 */
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    if (decoded.type !== "access") {
      return null
    }
    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Verify refresh token
 */
const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    if (decoded.type !== "refresh") {
      return null
    }
    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Decode token without verification (for debugging)
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token)
  } catch (error) {
    return null
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
}
