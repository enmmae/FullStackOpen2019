const mongoose = require('mongoose')

/* 3.12: tietokanta komentoriviltä */
/* Luo puhelinluettelo-sovellukselle pilvessä oleva mongo Mongo DB Atlaksen avulla */
/* Tee projektihakemistoon tiedosto mongo.js, jonka avulla voit lisätä tietokantaan */
/* puhelinnumeroja sekä listata kaikki kannassa olevat numerot */

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://new-user:${password}@cluster0-wuk8d.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length<5 ) {
  console.log('phonebook:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
      process.exit(1)
    })
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(response => {
  console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
  mongoose.connection.close()
})