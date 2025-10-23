/**
 * Rate Limiting Middleware
 * Prevents brute-force attacks and API abuse
 */

const rateLimit = require("express-rate-limit")

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Stricter limiter for signup
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 signup attempts per hour
  message: {
    success: false,
    message: "Too many accounts created from this IP, please try again after an hour",
  },
  skipSuccessfulRequests: true, // Don't count successful requests
})

// Stricter limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login attempts per 15 minutes
  message: {
    success: false,
    message: "Too many login attempts from this IP, please try again after 15 minutes",
  },
  skipSuccessfulRequests: true,
})

// Password reset limiter
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 password reset requests per hour
  message: {
    success: false,
    message: "Too many password reset attempts, please try again after an hour",
  },
})

module.exports = {
  generalLimiter,
  signupLimiter,
  loginLimiter,
  passwordResetLimiter,
}
