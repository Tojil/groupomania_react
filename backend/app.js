const express = require('express')
const mongoose = require('mongoose')
const { join } = require('path')
require('dotenv').config()
const routesModera = require('./routes/routesModera')
const routesPosts = require('./routes/routesPosts')
const routesUsers = require('./routes/routesUsers')

// Connection à Mongoose
mongoose
  .connect(process.env.SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexion à MongoDB réussi !'))
  .catch(() => console.log('connexion à MongoDB échouée !'))

const app = express()

// Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use('/images', express.static(join(__dirname, 'images')))
app.use('/api/posts', routesPosts)
app.use('/api/auth', routesUsers)
app.use('/api/moderation', routesModera)

module.exports = app
