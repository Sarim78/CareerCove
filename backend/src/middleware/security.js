/**
 * Security Middleware
 * Additional security measures for XSS and injection protection
 */

/**
 * Basic XSS protection middleware
 * Sanitizes user input
 */
const xssProtection = (req, res, next) => {
  // Sanitize request body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        // Remove script tags and other dangerous HTML
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
          .replace(/javascript:/gi, "")
          .replace(/on\w+\s*=/gi, "")
      }
    })
  }

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      if (typeof req.query[key] === "string") {
        req.query[key] = req.query[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
          .replace(/javascript:/gi, "")
          .replace(/on\w+\s*=/gi, "")
      }
    })
  }

  next()
}

/**
 * Security headers middleware
 */
const securityMiddleware = (req, res, next) => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY")

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff")

  // Enable XSS filter
  res.setHeader("X-XSS-Protection", "1; mode=block")

  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin")

  next()
}

module.exports = {
  xssProtection,
  securityMiddleware,
}
