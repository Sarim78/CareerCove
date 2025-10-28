const UserModel = require("../models/userModel")
const { generateTokens } = require("../utils/tokenUtils")

class AuthController {
  // Register new user
  static async register(req, res, next) {
    try {
      const { email, password, fullName } = req.body

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email)
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        })
      }

      // Create new user
      const user = await UserModel.create({ email, password, fullName })

      // Generate tokens
      const { accessToken, refreshToken, expiresAt } = generateTokens(user)

      // Store refresh token
      await UserModel.storeRefreshToken(user.id, refreshToken, expiresAt)

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: user.id,
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

  // Login user
  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      // Find user
      const user = await UserModel.findByEmail(email)
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Verify password
      const isValidPassword = await UserModel.verifyPassword(user, password)
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Check if account is active
      if (!user.is_active) {
        return res.status(403).json({
          success: false,
          message: "Account is deactivated",
        })
      }

      // Generate tokens
      const { accessToken, refreshToken, expiresAt } = generateTokens(user)

      // Store refresh token
      await UserModel.storeRefreshToken(user.id, refreshToken, expiresAt)

      // Update last login
      await UserModel.updateLastLogin(user.id)

      res.json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user.id,
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

  // Refresh access token
  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
        })
      }

      // Verify refresh token exists and is valid
      const tokenRecord = await UserModel.findRefreshToken(refreshToken)
      if (!tokenRecord) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired refresh token",
        })
      }

      // Get user
      const user = await UserModel.findById(tokenRecord.user_id)
      if (!user || !user.is_active) {
        return res.status(401).json({
          success: false,
          message: "User not found or inactive",
        })
      }

      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken, expiresAt } = generateTokens(user)

      // Revoke old refresh token
      await UserModel.revokeRefreshToken(refreshToken)

      // Store new refresh token
      await UserModel.storeRefreshToken(user.id, newRefreshToken, expiresAt)

      res.json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  // Logout user
  static async logout(req, res, next) {
    try {
      const { refreshToken } = req.body

      if (refreshToken) {
        await UserModel.revokeRefreshToken(refreshToken)
      }

      res.json({
        success: true,
        message: "Logout successful",
      })
    } catch (error) {
      next(error)
    }
  }

  // Get user profile
  static async getProfile(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.full_name,
            createdAt: user.created_at,
            lastLogin: user.last_login,
            emailVerified: user.email_verified,
          },
        },
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
