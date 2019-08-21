const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

/* 4.1 blogilista, step1 */
/* Tee sovelluksesta toimiva npm-projekti. Jotta sovelluskehitys olisi sujuvaa, konfiguroi sovellus suoritettavaksi nodemonilla */

/* 4.2 blogilista, step2 */
/* Jaa sovelluksen koodi tämän osan alun tapaan useaan moduuliin */

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})