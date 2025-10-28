const jwt = require("jsonwebtoken")

const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  }

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  })

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  })

  // Calculate refresh token expiration date
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

  return {
    accessToken,
    refreshToken,
    expiresAt,
  }
}

module.exports = {
  generateTokens,
}
