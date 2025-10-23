/**
 * Database Configuration
 * PostgreSQL connection with connection pooling
 */

const { Pool } = require("pg")

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "careercove_db",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
  connectionTimeoutMillis: 2000, // How long to wait for a connection
})

// Test database connection
const connectDB = async () => {
  try {
    const client = await pool.connect()
    console.log("Database connection pool established")
    client.release()
    return true
  } catch (error) {
    console.error("Database connection error:", error.message)
    throw error
  }
}

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected database pool error:", err)
  process.exit(-1)
})

// Query helper function with error handling
const query = async (text, params) => {
  const start = Date.now()
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start

    // Log slow queries in development
    if (process.env.NODE_ENV === "development" && duration > 1000) {
      console.log("Slow query detected:", { text, duration, rows: result.rowCount })
    }

    return result
  } catch (error) {
    console.error("Database query error:", error.message)
    throw error
  }
}

// Transaction helper
const transaction = async (callback) => {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

module.exports = {
  pool,
  query,
  transaction,
  connectDB,
}
