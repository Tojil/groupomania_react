// Importation de multer et indique qu'on gère uniquement les téléchargements de fichiers image
const multer = require('multer')
const path = require('path')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Indique à multer dans quel dossier engistrer les fichiers
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    const extPath = path.extname(`/images/${file.originalname}`)
    const name = file.originalname.split(' ').join('_').split(extPath).join('')
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + '_' + Date.now() + '.' + extension) // Indique à multer de remplacer le nom d'origine par un timestamp
  },
})

module.exports = multer({ storage }).single('image') // Importation de multer et indique qu'on gère uniquement les téléchargements de fichiers image
