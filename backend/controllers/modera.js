const Modera = require('../models/ModeraModels')
const fs = require('fs')
const jwt = require('jsonwebtoken')

let moderaModels = new Modera()

// Permet au moderateur de faire appel à tous les posts(publications)
exports.getAllPosts = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
  const mod = decodedToken.moderation
  if (mod == 1) {
    moderaModels.getAllPosts().then((response) => {
      res.status(200).json(JSON.stringify(response))
    })
  } else {
    res.status(400).json({ error: 'Requête non authorisée' })
  }
}

// Permet au moderateur d'appeller tous les commentaires
exports.getAllComments = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
  const mod = decodedToken.moderation
  if (mod == 1) {
    moderaModels.getAllComments().then((response) => {
      res.status(200).json(JSON.stringify(response))
    })
  } else {
    res.status(400).json({ error: 'Requête non authorisée' })
  }
}

// Permet au moderateur de supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
  const mod = decodedToken.moderation
  if (mod == 1) {
    let commentId = req.params.id
    let sqlInserts = [commentId]
    moderaModels.deleteComment(sqlInserts).then((response) => {
      res.status(200).json(JSON.stringify(response))
    })
  } else {
    res.status(400).json({ error: 'Requête non authorisée' })
  }
}

// Permet au moderateur de supprimer un post(publication)
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
  const mod = decodedToken.moderation
  if (mod === 1) {
    let postId = req.params.id
    let sqlInserts = [postId]
    moderaModels.deletePost(sqlInserts).then((response) => {
      res.status(200).json(JSON.stringify(response))
    })
  } else {
    res.status(400).json({ error: 'Requête non authorisée' })
  }
}
