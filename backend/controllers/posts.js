const jwt = require('jsonwebtoken') //jwt permet l'échange sécurisé de jetons (tokens)
const PostModels = require('../models/PostModels')
const fs = require('fs')
const auth = require('../middleware/auth')

let userId = auth()
let postsModels = new PostModels()

// Appel tous les posts(publications)
exports.getAllPosts = (req, res, next) => {
  postsModels
    .find() // Methode renvoie un tableau contenant toutes les posts dans la base de données
    .then((posts) => res.status(200).json(posts))
    .catch((error) => req.status(400).json({ error }))
}

// Création d'un post (une publication)
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post)
  delete postObject._id
  const post = new postsModels({
    // Creation d'une nouvelle instance du modèle PostModels
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`, // Génère url de l'image
    title: '',
    content: '',
    likes: 0,
    dislikes: 0,
    usersLiked: '',
    usersDisliked: '',
  })
  post
    .save() // Enregistre dans la db l'objet et renvoie une promesse
    .then(() =>
      res.status(201).json({ message: 'Nouvelle sauce enregistrée !' })
    )
    .catch((error) => res.status(400).json({ error }))
}
// Met a jour un post(publication)
exports.modifyPost = (req, res, next) => {
  let userAuth = [userId]
  const postObject = req.file
    ? {
        ...jwt.JsonWebTokenError.parse(req.body.post), // recupération de toutes les infos de l'objet
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  postsModels
    .updateOne(userAuth, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié !' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
  let userAuth = [userId]
  postsModels
    .deletePost(userAuth)
    .then(() => res.status(200).json({ message: 'Post suprimé !' }))
    .catch((error) => res.status(400).json({ error }))
}
//  Appel les comentaires
exports.getComments = (req, res, next) => {
  postsModels
    .find()
    .then(() => res.status(200).json({ message: 'Voici les Commentaires !' }))
    .catch((error) => res.status(400).json({ error }))
}
//  Creation d'un commentaire
// Création d'un post (une publication)
exports.createComment = (req, res, next) => {
  const postObject = JSON.parse(req.body.post)
  delete postObject._id
  const post = new postsModels({
    // Creation d'une nouvelle instance du modèle PostModels
    ...postObject,
    title: '',
    content: '',
    likes: 0,
    dislikes: 0,
    usersLiked: '',
    usersDisliked: '',
  })
  post
    .save() // Enregistre dans la db l'objet et renvoie une promesse
    .then(() =>
      res.status(201).json({ message: 'Nouveau commentaire enregistré !' })
    )
    .catch((error) => res.status(400).json({ error }))
}

// Met à jour un commentaire
exports.updateComment = (req, res, next) => {
  let content = req.body.content
  let commentId = req.params.id
  postsModels
    .updateOne(
      { _id: userId },
      { $set: { comContent: content, commentId: commentId } }
    )
    .then((response) => {
      res.status(201).json(JSON.stringify(response))
    })
    .catch((error) => {
      console.log(error)
      res.status(400).json(JSON.stringify(error))
    })
}
//  Supprime un commentaire
exports.deleteComment = (req, res, next) => {
  let commentId = req.params.id
  let comment = [commentId]
  postsModels
    .deleteOne(comment)
    .then((post) => res.status(200).json(post))
    .catch((error) => req.status(400).json({ error }))
}
//  Appel tous les likes
exports.getAllLikes = (req, res, next) => {
  postsModels
    .find()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }))
}
// Like Or Dislike
// Un seul like ou dislike par user
exports.likeOrNot = (req, res, next) => {
  if (req.body.like === 1) {
    postsModels
      .updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: req.body.like++ },
          $push: { usersLiked: req.body.userId },
        }
      )
      .then((post) => res.status(200).json({ message: 'Ajout Like' }))
      .catch((error) => res.status(400).json({ error }))
  } else if (req.body.like === -1) {
    postsModels
      .updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: req.body.like++ * -1 },
          $push: { usersDisliked: req.body.userId },
        }
      )
      .then((post) => res.status(200).json({ message: 'Ajout Dislike' }))
      .catch((error) => res.status(400).json({ error }))
  } else {
    postsModels
      .findOne({ _id: req.params.id })
      .then((post) => {
        if (post.usersLiked.includes(req.body.userId)) {
          postsModels
            .updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
            )
            .then((post) => {
              res.status(200).json({ message: 'Suppression Like' })
            })
            .catch((error) => res.status(400).json({ error }))
        } else if (post.usersDisliked.includes(req.body.userId)) {
          postsModels
            .updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
            .then((post) => {
              res.status(200).json({ message: 'Suppression Dislike' })
            })
            .catch((error) => res.status(400).json({ error }))
        }
      })
      .catch((error) => res.status(400).json({ error }))
  }
}

exports.deleteImage = (req, res, next) => {
  let imageDel = [userId]
  postsModels.deleteOne(imageDel).then((user) => {
    const filename = user[0].imageProfil
    fs.unlink(filename, () => console.log('ok'))
  })
}
