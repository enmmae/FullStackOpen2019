require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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

/*
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
] */

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

/* 3.1 puhelinluettelon backend step1 */
/* Tee Node-sovellus, joka tarjoaa osoitteessa http://localhost:3001/api/persons kovakoodatun taulukon puhelinnumerotietoja */

/* 3.13: puhelinluettelo ja tietokanta, step1 */
/* Muuta backendin kaikkien puhelintietojen näyttämistä siten, että se hakee näytettävät puhelintiedot tietokannasta */

app.get('/api/persons', (req, res) => {
  console.log('get all persons')
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

/* 3.2: puhelinluettelon backend step2 */
/* Tee sovelluksen osoitteeseen http://localhost:3001/info sivu, joka kertoo pyynnön tekohetken */
/* sekä sen, kuinka monta puhelinluettelotietoa sovelluksen muistissa olevassa taulukossa on */

/* 3.18*: puhelinluettelo ja tietokanta, step5 */
/* Päivitä myös polkujen api/persons/:id ja info käsittely */

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<div>Phonebook has info for ${persons.length} people<br></br>${new Date()}</div>`)
  })
})

/* 3.3: puhelinluettelon backend step3 */
/* Toteuta toiminnallisuus yksittäisen puhelinnumerotiedon näyttämiseen */
/* Jos id:tä vastaavaa puhelinnumerotietoa ei ole, tulee palvelimen vastata asianmukaisella statuskoodilla */

app.get('/api/persons/:id', (req, res, next) => {
  console.log(`finding a person with id ${req.params.id}`)
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

/* 3.4: puhelinluettelon backend step4 */
/* Toteuta toiminnallisuus, jonka avulla puhelinnumerotieto on mahdollista poistaa numerotiedon */
/* yksilöivään URL:iin tehtävällä HTTP DELETE -pyynnöllä */

/* 3.15: puhelinluettelo ja tietokanta, step3 */
/* Muuta backendiä siten, että numerotietojen poistaminen päivittyy tietokantaan */

app.delete('/api/persons/:id', (req, res, next) => {
  console.log(`removing person with id ${req.params.id}`)
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
      console.log(result)
      res.status(204).end()
    })
    .catch(error => next(error))
})

/* 3.5: puhelinluettelon backend step5 */
/* Laajenna backendia siten, että uusia puhelintietoja on mahdollista lisätä osoitteeseen */
/* http://localhost:3001/api/persons tapahtuvalla HTTP POST -pyynnöllä */

/* 3.6: puhelinluettelon backend step6 */
/* Tee uuden numeron lisäykseen virheiden käsittely. Vastaa asiaankuuluvalla statuskoodilla ja */
/* liitä vastaukseen mukaan myös tieto, joka kertoo virheen syyn */

/* 3.14: puhelinluettelo ja tietokanta, step2 */
/* Muuta backendiä siten, että uudet numerot tallennetaan tietokantaan. Varmista, että frontend toimii muutosten jälkeen */

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

/* 3.17*: puhelinluettelo ja tietokanta, step4 */
/* Jos frontendissä annetaan numero henkilölle, joka on jo olemassa, päivittää frontend tehtävässä 2.18 */
/* tehdyn toteutuksen ansiosta tiedot uudella numerolla tekemällä HTTP PUT -pyynnön henkilön tietoja */
/* vastaavaan url:iin. Laajenna backendisi käsittelemään tämä tilanne */

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

/* 3.16: puhelinluettelo ja tietokanta, step3 */
/* Keskitä sovelluksen virheidenkäsittely middlewareen */

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoError' && error.code === 11000) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
