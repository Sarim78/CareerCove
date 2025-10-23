/**
 * CareerCove Backend Server
 * Main entry point for the Express application
 */

require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const { connectDB } = require("./config/database")
const { errorHandler } = require("./utils/errorHandler")
const { securityMiddleware } = require("./middleware/security")

// Import routes
const authRoutes = require("./routes/authRoutes")

const app = express()
const PORT = process.env.PORT || 5000

// ============================================
// MIDDLEWARE SETUP
// ============================================

// Security middleware - must be first
app.use(helmet())
app.use(securityMiddleware)

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Request logging in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
  })
}

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerCove API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

// API version endpoint
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    version: "1.0.0",
    message: "Welcome to CareerCove API",
    endpoints: {
      auth: "/api/auth",
      health: "/health",
    },
  })
})

// Authentication routes
app.use("/api/auth", authRoutes)

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  })
})

// ============================================
// ERROR HANDLING
// ============================================

// Global error handler (must be last)
app.use(errorHandler)

// ============================================
// SERVER INITIALIZATION
// ============================================

const startServer = async () => {
  try {
    // Connect to database
    await connectDB()
    console.log("✓ Database connected successfully")

    // Start server
    app.listen(PORT, () => {
      console.log("")
      console.log("================================")
      console.log("🚀 CareerCove Backend Started")
      console.log("================================")
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
      console.log(`Server: http://localhost:${PORT}`)
      console.log(`Health: http://localhost:${PORT}/health`)
      console.log(`API: http://localhost:${PORT}/api`)
      console.log("================================")
      console.log("")
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error.message)
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err)
  // Close server & exit process in production
  if (process.env.NODE_ENV === "production") {
    process.exit(1)
  }
})

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err)
  process.exit(1)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...")
  process.exit(0)
})

// Start the server
startServer()

module.exports = app
