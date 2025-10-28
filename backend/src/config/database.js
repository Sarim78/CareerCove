const { Pool } = require("pg")

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect()
    await client.query("SELECT NOW()")
    client.release()
    return true
  } catch (error) {
    console.error("Database connection error:", error.message)
    throw error
  }
}

// Query helper with error handling
const query = async (text, params) => {
  const start = Date.now()
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error("Query error:", error.message)
    throw error
  }
}

module.exports = {
  pool,
  query,
  testConnection,
}
