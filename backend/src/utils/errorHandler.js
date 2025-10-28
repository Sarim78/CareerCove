const errorHandler = (err, req, res, next) => {
  console.error("Error:", err)

  // Default error
  let statusCode = err.statusCode || 500
  let message = err.message || "Internal server error"

  // Mongoose/Database errors
  if (err.name === "ValidationError") {
    statusCode = 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ")
  }

  if (err.code === "23505") {
    // PostgreSQL unique violation
    statusCode = 400
    message = "Duplicate entry found"
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401
    message = "Invalid token"
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401
    message = "Token expired"
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

module.exports = { errorHandler }
