const helmet = require("helmet")
const cors = require("cors")

const securityMiddleware = (app) => {
  // Helmet for security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    }),
  )

  // CORS configuration
  const corsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : ["http://localhost:3000"]

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  }

  app.use(cors(corsOptions))

  // Prevent parameter pollution
  app.use((req, res, next) => {
    if (req.query) {
      Object.keys(req.query).forEach((key) => {
        if (Array.isArray(req.query[key])) {
          req.query[key] = req.query[key][0]
        }
      })
    }
    next()
  })
}

module.exports = { securityMiddleware }
