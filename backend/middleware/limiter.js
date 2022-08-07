const rateLimit = require('express-rate-limit')

// limiter le nombre de requêttes dans le server
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
})

module.exports = { limiter }
