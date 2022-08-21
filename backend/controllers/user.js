const bcrypt = require('bcrypt') //bcrpyt permet un cryptage sécurisé
const jwt = require('jsonwebtoken') //jwt permet l'échange sécurisé de jetons (tokens)
const fs = require('fs')
const auth = require('../middleware/auth')
const UserModels = require('../models/UserModels')

let userId = auth()
let userModels = new UserModels()

// Creation fonctions signup et login

// Créer compte utilisateur

exports.signup = (req, res) => {
  const regexPasswordHard = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (regexPasswordHard.test(req.body.password)) {
    // Regex verifie que le mot de passe remplise les conditions
    bcrypt // bcrypt il va recuperer le mot de passe et il va le hacher autant de fois demandé 10
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new UserModels({
          email: req.body.email,
          password: hash,
        })
        user
          .save() // il l'enregistre dans a base de données et renvooie la reponse
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch((error) => res.status(400).json({ error }))
      })
      .catch((error) => res.status(500).json({ error }))
  } else {
    // s'il ne rempli pas mes conditions du regex alors
    res.status(400).json({
      message:
        'Mot de passe invalide, veuillez mettre au minimum 8 caractères, dont 1 majuscule et un nombre',
    })
  }
}

// Connexion à un compte utilisateur
exports.login = (req, res, next) => {
  UserModels.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect !' })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h',
            }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

// Permet de voir le profil
exports.seeMyProfile = (req, res, next) => {
  let myProfile = [userId]
  userModels
    .findOne(myProfile)
    .then((response) => res.status(200).json({ message: 'Le Voila' }))
    .catch((error) => res.status(404).json({ error }))
}

// Update User
exports.updateUser = (req, res, next) => {
  let myProfile = [userId]
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.sauce), // Récupération de toutes les infos sur l'objet
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  userModels
    .updateOne(myProfile, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur modifiée !' }))
    .catch((error) => res.status(400).json({ error }))
}

// Delete User
exports.deleteUser = (req, res, next) => {
  let myProfile = [userId]
  userModels
    .findOne(myProfile)
    .then((profile) => {
      const filename = profile.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        userModels
          .deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: 'Utilisateur supprimée !' })
          )
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.deleteImage = (req, res, next) => {
  let myProfile = [userId]
  userModels.deleteOne(myProfile).then((user) => {
    const filename = user[0].imageProfil
    fs.unlink(filename, () => console.log('ok'))
  })
}
