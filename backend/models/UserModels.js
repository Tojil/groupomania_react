const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Creation schema de donnée enregistrement
const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastName: { type: String, required: false },
  firstName: { type: String, required: false },
  moderation: { type: Number, required: false },
  imageProfil: {
    type: String,
    required: false,
    default: '../images/profile.png',
  },
})
// L'ajout de unique validator rend impossible d'avoir plusieurs utilisateurs inscrits avec la même adresse mail
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
