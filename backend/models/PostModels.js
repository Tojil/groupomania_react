const mongoose = require('mongoose')

// Creation schema de donnée
// Modèle de données qui permet d'enregistrer, lire et modifier les objets qui sont dans la base de donnée
const postSchema = mongoose.Schema({
  id: { type: String, required: false },
  userId: { type: String, required: true },
  title: { type: String, required: false },
  content: { type: String, required: true },
  date: { type: String, required: false },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false },
  media: { type: String, required: false },
})

module.exports = mongoose.model('post', postSchema)
