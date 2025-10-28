const express = require("express")
const dotenv = require("dotenv")
const { securityMiddleware } = require("./middleware/security")
const { errorHandler } = require("./utils/errorHandler")
const authRoutes = require("./routes/authRoutes")
const { testConnection } = require("./config/database")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Apply security middleware
securityMiddleware(app)

// Body parser middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "CareerCove Backend is running",
    timestamp: new Date().toISOString(),
  })
})

// API routes
app.use("/api/auth", authRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection()

    app.listen(PORT, () => {
      console.log("🚀 CareerCove Backend Server Started")
      console.log(`📡 Server running on port ${PORT}`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
      console.log(`✅ Database connected successfully`)
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error.message)
    process.exit(1)
  }
}

startServer()

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server")
  process.exit(0)
})

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server")
  process.exit(0)
})
