/**
 * Authentication Controller
 * Handles user signup, login, logout, and token refresh
 */

const UserModel = require("../models/userModel")
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/tokenUtils")

class AuthController {
  /**
   * User Signup
   * POST /api/auth/signup
   */
  static async signup(req, res, next) {
    try {
      const { username, email, password, fullName } = req.body

      // Create new user
      const user = await UserModel.createUser({
        username,
        email,
        password,
        fullName,
      })

      // Generate tokens
      const accessToken = generateAccessToken(user.id)
      const refreshToken = generateRefreshToken(user.id)

      // Store refresh token
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      await UserModel.storeRefreshToken(user.id, refreshToken, expiresAt, req.ip, req.get("user-agent"))

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.full_name,
          },
          accessToken,
          refreshToken,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * User Login
   * POST /api/auth/login
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      // Find user by email
      const user = await UserModel.findByEmail(email)
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Verify password
      const isPasswordValid = await UserModel.verifyPassword(password, user.password_hash)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Generate tokens
      const accessToken = generateAccessToken(user.id)
      const refreshToken = generateRefreshToken(user.id)

      // Store refresh token
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      await UserModel.storeRefreshToken(user.id, refreshToken, expiresAt, req.ip, req.get("user-agent"))

      // Update last login
      await UserModel.updateLastLogin(user.id)

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.full_name,
          },
          accessToken,
          refreshToken,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get User Profile
   * GET /api/auth/profile
   */
  static async getProfile(req, res, next) {
    try {
      const user = await UserModel.findById(req.userId)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.full_name,
            status: user.status,
            createdAt: user.created_at,
            lastLogin: user.last_login,
          },
        },
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Refresh Access Token
   * POST /api/auth/refresh
   */
  static async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
        })
      }

      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken)
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired refresh token",
        })
      }

      // Check if token exists in database
      const tokenData = await UserModel.findRefreshToken(refreshToken)
      if (!tokenData) {
        return res.status(401).json({
          success: false,
          message: "Refresh token not found or expired",
        })
      }

      // Check user status
      if (tokenData.user_status !== "active") {
        return res.status(403).json({
          success: false,
          message: "User account is not active",
        })
      }

      // Generate new access token
      const accessToken = generateAccessToken(decoded.userId)

      res.status(200).json({
        success: true,
        data: {
          accessToken,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * User Logout
   * POST /api/auth/logout
   */
  static async logout(req, res, next) {
    try {
      const { refreshToken } = req.body

      if (refreshToken) {
        // Delete the specific refresh token
        await UserModel.deleteRefreshToken(refreshToken)
      }

      // Optionally, delete all tokens for this user
      // await UserModel.deleteAllUserTokens(req.userId);

      res.status(200).json({
        success: true,
        message: "Logout successful",
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
