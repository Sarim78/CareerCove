/**
 * User Model
 * Database operations for user management
 */

const { query } = require("../config/database")
const argon2 = require("argon2")

class UserModel {
  /**
   * Create a new user
   */
  static async createUser({ username, email, password, fullName }) {
    try {
      // Hash password using Argon2
      const passwordHash = await argon2.hash(password, {
        type: argon2.argon2id, // Most secure variant
        memoryCost: 2 ** 16, // 64 MB
        timeCost: 3,
        parallelism: 1,
      })

      const result = await query(
        `INSERT INTO users (username, email, password_hash, full_name)
         VALUES ($1, $2, $3, $4)
         RETURNING id, username, email, full_name, status, created_at`,
        [username, email, passwordHash, fullName],
      )

      return result.rows[0]
    } catch (error) {
      // Handle unique constraint violations
      if (error.code === "23505") {
        if (error.constraint === "users_email_key") {
          throw new Error("Email already registered")
        }
        if (error.constraint === "users_username_key") {
          throw new Error("Username already taken")
        }
      }
      throw error
    }
  }

  /**
   * Find user by email
   */
  static async findByEmail(email) {
    const result = await query("SELECT * FROM users WHERE email = $1 AND status = $2", [email, "active"])
    return result.rows[0]
  }

  /**
   * Find user by ID
   */
  static async findById(id) {
    const result = await query(
      "SELECT id, username, email, full_name, status, created_at, updated_at, last_login FROM users WHERE id = $1",
      [id],
    )
    return result.rows[0]
  }

  /**
   * Find user by username
   */
  static async findByUsername(username) {
    const result = await query("SELECT * FROM users WHERE username = $1 AND status = $2", [username, "active"])
    return result.rows[0]
  }

  /**
   * Verify password
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await argon2.verify(hashedPassword, plainPassword)
    } catch (error) {
      console.error("Password verification error:", error)
      return false
    }
  }

  /**
   * Update last login timestamp
   */
  static async updateLastLogin(userId) {
    await query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1", [userId])
  }

  /**
   * Check if email exists
   */
  static async emailExists(email) {
    const result = await query("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", [email])
    return result.rows[0].exists
  }

  /**
   * Check if username exists
   */
  static async usernameExists(username) {
    const result = await query("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)", [username])
    return result.rows[0].exists
  }

  /**
   * Store refresh token
   */
  static async storeRefreshToken(userId, token, expiresAt, ipAddress, userAgent) {
    await query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, token, expiresAt, ipAddress, userAgent],
    )
  }

  /**
   * Find refresh token
   */
  static async findRefreshToken(token) {
    const result = await query(
      `SELECT rt.*, u.id as user_id, u.status as user_status
       FROM refresh_tokens rt
       JOIN users u ON rt.user_id = u.id
       WHERE rt.token = $1 AND rt.expires_at > CURRENT_TIMESTAMP`,
      [token],
    )
    return result.rows[0]
  }

  /**
   * Delete refresh token (logout)
   */
  static async deleteRefreshToken(token) {
    await query("DELETE FROM refresh_tokens WHERE token = $1", [token])
  }

  /**
   * Delete all user's refresh tokens
   */
  static async deleteAllUserTokens(userId) {
    await query("DELETE FROM refresh_tokens WHERE user_id = $1", [userId])
  }

  /**
   * Cleanup expired tokens
   */
  static async cleanupExpiredTokens() {
    const result = await query("DELETE FROM refresh_tokens WHERE expires_at < CURRENT_TIMESTAMP")
    return result.rowCount
  }
}

module.exports = UserModel
