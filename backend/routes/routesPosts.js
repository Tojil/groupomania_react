const express = require('express') // Ici, nous importons le package express pour creer des applications express
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postsCtrl = require('../controllers/posts')

try {
  router.get('/', auth, postsCtrl.getAllPosts) // Récupére tous les posts(publications)
  router.post('/', auth, multer, postsCtrl.createPost) // Enregistre le post(publication) créé
  router.put('/:id', auth, multer, postsCtrl.modifyPost) // Met à jour le post(publication) modifié
  router.delete('/:id', auth, postsCtrl.deletePost) // Supprime un post(publication)

  router.delete('/', auth, multer, postsCtrl.deleteImage)

  router.get('/likes', auth, postsCtrl.getAllLikes) //  Récupére tous les likes
  router.post('/:id/like', auth, postsCtrl.likeOrNot) // Envoie un like

  router.get('/:id/comments', auth, postsCtrl.getComments) // Récupére les commentaires
  router.post('/:id/comments', auth, postsCtrl.createComment) // Enregistre un nouveau commentaire
  router.put('/comments/:id', auth, postsCtrl.updateComment) //  Met à jour la modification d'un commentaire
  router.delete('/comments/:id', auth, postsCtrl.deleteComment) //   Supprime un commentaire
} catch (error) {
  console.log(error)
}

module.exports = router
