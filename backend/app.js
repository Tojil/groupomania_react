const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Connection à Mongoose
mongoose
  .connect(process.env.SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexion à MongoDB réussi !'))
  .catch(() => console.log('connexion à MongoDB échouée !'))

const app = express()

app.use((req, res, next) => {
  console.log('Requête reçue !')
  next()
})

app.use((req, res, next) => {
  res.status(201)
  next()
})

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' })
  next()
})

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !')
})

module.exports = app
