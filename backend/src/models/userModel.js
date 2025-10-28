const { query } = require("../config/database")
const argon2 = require("argon2")
const { v4: uuidv4 } = require("uuid")

class UserModel {
  // Create a new user
  static async create({ email, password, fullName }) {
    try {
      // Hash password with Argon2
      const passwordHash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
      })

      const result = await query(
        `INSERT INTO users (email, password_hash, full_name) 
         VALUES ($1, $2, $3) 
         RETURNING id, email, full_name, created_at`,
        [email.toLowerCase(), passwordHash, fullName],
      )

      return result.rows[0]
    } catch (error) {
      if (error.code === "23505") {
        // Unique violation
        throw new Error("Email already exists")
      }
      throw error
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const result = await query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()])
    return result.rows[0]
  }

  // Find user by ID
  static async findById(id) {
    const result = await query(
      "SELECT id, email, full_name, created_at, last_login, is_active, email_verified FROM users WHERE id = $1",
      [id],
    )
    return result.rows[0]
  }

  // Verify password
  static async verifyPassword(user, password) {
    try {
      return await argon2.verify(user.password_hash, password)
    } catch (error) {
      return false
    }
  }

  // Update last login
  static async updateLastLogin(userId) {
    await query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1", [userId])
  }

  // Store refresh token
  static async storeRefreshToken(userId, token, expiresAt) {
    await query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at) 
       VALUES ($1, $2, $3)`,
      [userId, token, expiresAt],
    )
  }

  // Find refresh token
  static async findRefreshToken(token) {
    const result = await query(
      `SELECT * FROM refresh_tokens 
       WHERE token = $1 AND expires_at > CURRENT_TIMESTAMP AND revoked = false`,
      [token],
    )
    return result.rows[0]
  }

  // Revoke refresh token
  static async revokeRefreshToken(token) {
    await query("UPDATE refresh_tokens SET revoked = true WHERE token = $1", [token])
  }

  // Revoke all user tokens
  static async revokeAllUserTokens(userId) {
    await query("UPDATE refresh_tokens SET revoked = true WHERE user_id = $1", [userId])
  }

  // Clean expired tokens
  static async cleanExpiredTokens() {
    await query("DELETE FROM refresh_tokens WHERE expires_at < CURRENT_TIMESTAMP")
  }
}

module.exports = UserModel
