require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

/* 3.9 puhelinluettelon backend step9 */
/* Laita backend toimimaan edellisessä osassa tehdyn puhelinluettelon frontendin kanssa muilta osin, */
/* paitsi mahdollisen puhelinnumeron muutoksen osalta */

/* 3.10 puhelinluettelon backend step10 */
/* Vie sovelluksen backend internetiin, esim. Herokuun */

/* 3.11 puhelinluettelo full stack */
/* Generoi frontendistä tuotantoversio ja lisää se internetissä olevaan sovellukseesi tämän osan ohjeiden mukaisesti */
/* Huolehdi myös, että frontend toimii edelleen myös paikallisesti */

app.use(cors())
app.use(bodyParser.json())

/* 3.8*: puhelinluettelon backend step8 */
/* Konfiguroi morgania siten, että se näyttää myös HTTP POST -pyyntöjen mukana tulevan datan */
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))

/* 3.7: puhelinluettelon backend step7 */
/* Lisää sovellukseesi loggausta tekevä middleware morgan. Konfiguroi se logaamaan konsoliin tiny-konfiguraation mukaisesti */
/* tinyn minimal output-> :method :url :status :res[content-length] - :response-time ms */

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

/* 3.1 puhelinluettelon backend step1 */
/* Tee Node-sovellus, joka tarjoaa osoitteessa http://localhost:3001/api/persons kovakoodatun taulukon puhelinnumerotietoja */

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

/* 3.2: puhelinluettelon backend step2 */
/* Tee sovelluksen osoitteeseen http://localhost:3001/info sivu, joka kertoo pyynnön tekohetken */
/* sekä sen, kuinka monta puhelinluettelotietoa sovelluksen muistissa olevassa taulukossa on */

app.get('/info', (req, res) => {
  res.send(`<div>Phonebook has info for ${persons.length} people<br></br>${new Date()}</div>`)
})

/* 3.3: puhelinluettelon backend step3 */
/* Toteuta toiminnallisuus yksittäisen puhelinnumerotiedon näyttämiseen */
/* Jos id:tä vastaavaa puhelinnumerotietoa ei ole, tulee palvelimen vastata asianmukaisella statuskoodilla */

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

/* 3.4: puhelinluettelon backend step4 */
/* Toteuta toiminnallisuus, jonka avulla puhelinnumerotieto on mahdollista poistaa numerotiedon */
/* yksilöivään URL:iin tehtävällä HTTP DELETE -pyynnöllä */

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

/* 3.5: puhelinluettelon backend step5 */
/* Laajenna backendia siten, että uusia puhelintietoja on mahdollista lisätä osoitteeseen */
/* http://localhost:3001/api/persons tapahtuvalla HTTP POST -pyynnöllä */

/* 3.6: puhelinluettelon backend step6 */
/* Tee uuden numeron lisäykseen virheiden käsittely. Vastaa asiaankuuluvalla statuskoodilla ja */
/* liitä vastaukseen mukaan myös tieto, joka kertoo virheen syyn */

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)

  if (!body.name) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  else if (body.name === '' || body.number === '') {
    return res.status(400).json({
      error: 'both name and number must have values'
    })
  }
  else if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  let id = Math.floor(Math.random() * Math.floor(persons.length * 5))

  const person = {
    name: body.name,
    number: body.number,
    id: id
  }

  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
