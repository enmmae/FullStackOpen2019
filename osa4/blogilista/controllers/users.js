const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

/* 4.15: blogilistan laajennus, step4 */
/* Tee järjestelmään myös mahdollisuus katsoa kaikkien käyttäjien tiedot sopivalla HTTP-pyynnöllä. */

/* 4.17: blogilistan laajennus, step6 */
/* ja käyttäjien listausta siten että käyttäjien lisäämät blogit ovat näkyvillä */

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users.map(u => u.toJSON()))
})

/* 4.15: blogilistan laajennus, step4 */
/* Tee sovellukseen mahdollisuus luoda käyttäjiä tekemällä HTTP POST -pyyntö osoitteeseen api/users. */
/* Käyttäjillä on käyttäjätunnus, salasana ja nimi. */

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.password === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    else if (body.password.length < 3) {
      return response.status(400).json({ error: 'password is too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter