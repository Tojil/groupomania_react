// Connection à Mongoose
const mongoose = require('mongoose')

const connect = mongoose
  .connect(process.env.SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexion à MongoDB réussi !'))
  .catch(() => console.log('connexion à MongoDB échouée !'))

module.exports = connect
