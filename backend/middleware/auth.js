// Vérification tokens
const jwt = require('jsonwebtoken')

// Middleware d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // il va recuperer le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') // il va decoder et verifier le token
    const userId = decodedToken.userId // il va recuperer l'id de l'utilisateur qui est encodé dans le token
    if (req.body.userId && req.body.userId !== userId) {
      // Si il y a un userId avec la requette et que celui ci est different de userId; Alors Error
      // eslint-disable-next-line no-throw-literal
      throw 'Invalid user ID'
    } else {
      next()
    }
  } catch {
    console.log({ message: 'Problem' })
  }
}
