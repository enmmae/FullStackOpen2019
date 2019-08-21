const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('useFindAndModify', false) /* DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated */

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

/* 3.19: puhelinluettelo ja tietokanta, step7 */
/* Toteuta sovelluksellesi validaatio, joka huolehtii, että backendiin ei voi lisätä nimeä, joka on jo puhelinluettelossa */

/* 3.20*: puhelinluettelo ja tietokanta, step8 */
/* Laajenna validaatiota siten, että tietokantaan talletettavan nimen on oltava pituudeltaan vähintään 3 merkkiä ja puhelinnumeron vähitään 8 merkkiä. */
/* Laajenna sovelluksen frontendia siten, että se antaa jonkinlaisen virheilmoituksen validoinnin epäonnistuessa */

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true
  },
  number: {
    type: String,
    minlength: 8
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)