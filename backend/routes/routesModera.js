const express = require('express') // Ici, nous importons le package express pour creer des applications express
const router = express.Router() // Implémentation des routes

const auth = require('../middleware/auth')

const modCtrl = require('../controllers/modera')

try {
  router.get('/comments', auth, modCtrl.getAllComments) // En tant que moderateur Récupére tous les commentaires
  router.get('/posts', auth, modCtrl.getAllPosts) //  En tant que moderateur Récupére tous les posts(publications)
  router.delete('/comment/:id', auth, modCtrl.deleteComment) // En tant que moderateur Supprime un commentaire spécifique
  router.delete('/post/:id', auth, modCtrl.deletePost) //  En tant que moderateur Supprime un post(publiation) spécifique
} catch (error) {
  console.log(error)
}

module.exports = router
