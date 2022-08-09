const express = require('express') // Ici, nous importons le package express pour creer des applications express
const router = express.Router()

const auth = require('../middleware/auth.js')
const multer = require('../middleware/multer-config')

const userCtrl = require('../controllers/user')

try {
  router.post('/signup', userCtrl.signup) // Envoie l'enregistrement d'un nouvel utilisateur
  router.post('/login', userCtrl.login) //  Envoie le login de l'utilisateur
  router.get('/', auth, userCtrl.seeMyProfile) //  Récupére le profil
  router.delete('/', auth, userCtrl.deleteUser) //  Supprime un profil un utilisateur
  router.delete('/images', auth, multer, userCtrl.deleteImage)
  router.post('/', auth, multer, userCtrl.updateUser) // Enovie la mise a jour de la modification de l'utilisateur
} catch (error) {
  console.log(error)
}

module.exports = router
