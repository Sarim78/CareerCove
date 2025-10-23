/**
 * Centralized Error Handling
 * Handles all application errors consistently
 */

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || "Internal Server Error"

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", {
      message: err.message,
      stack: err.stack,
      statusCode,
    })
  }

  // PostgreSQL errors
  if (err.code) {
    switch (err.code) {
      case "23505": // Unique constraint violation
        statusCode = 409
        message = "Resource already exists"
        break
      case "23503": // Foreign key violation
        statusCode = 400
        message = "Invalid reference"
        break
      case "22P02": // Invalid text representation
        statusCode = 400
        message = "Invalid data format"
        break
      case "23502": // Not null violation
        statusCode = 400
        message = "Required field missing"
        break
    }
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401
    message = "Invalid token"
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401
    message = "Token expired"
  }

  // Validation errors
  if (err.name === "ValidationError") {
    statusCode = 400
    message = "Validation failed"
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

/**
 * Async handler wrapper
 * Catches async errors and passes to error handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = {
  ApiError,
  errorHandler,
  asyncHandler,
}
