const http = require('http') // Ici, nous importons le package HTTP natif de Node et l'utiliser pour créer un serveur
const app = require('./app')

// la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

// La fonction normalizePort() renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée.
// et elle va les loguer Elle est ensuite enregistrer dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

const server = http.createServer(app)

// le server On Error c'est un evenement qui est declanché quand il y a une error dans le server et
// et cette evenement dirige vers errorHandler
server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

// Ecouteur d'évènement, consignant le port nommé sur lequel le serveur s'exécute dans la console. Ecoute et attend les requêtes envoyées
server.listen(port)
