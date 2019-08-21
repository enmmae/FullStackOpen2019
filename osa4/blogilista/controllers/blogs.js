const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/* 4.8: blogilistan testit, step 1 */
/* Kun testi on valmis, refaktoroi operaatio käyttämään promisejen sijaan async/awaitia. */

/* 4.17: blogilistan laajennus, step6 */
/* Muokaa kaikkien blogien listausta siten, että blogien yhteydessä näytetään lisääjän tiedot */

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

/* 4.19: blogilistan laajennus, step8 */
/* Muuta blogien lisäämistä siten, että se on mahdollista vain, jos lisäyksen tekevässä HTTP POST -pyynnössä */
/* on mukana validi token. Tokenin haltija määritellään blogin lisääjäksi. */

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
} */

/* 4.10: blogilistan testit, step3 */
/* Kun testi on valmis, refaktoroi operaatio käyttämään promisejen sijaan async/awaitia. */

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  // const token = getTokenFrom(request)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

/* 4.13 blogilistan laajennus, step1 */
/* Toteuta sovellukseen mahdollisuus yksittäisen blogin poistoon. */

/* 4.21*: blogilistan laajennus, step10 */
/* Muuta blogin poistavaa operaatiota siten, että poisto onnistuu ainoastaan jos poisto-operaation */
/* tekijä (eli se kenen token on pyynnön mukana) on sama kuin blogin lisääjä. */

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    // Tokenista dekoodatun olion sisällä on kentät username ja id eli se kertoo palvelimelle kuka pyynnön on tehnyt.
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    console.log(blog)

    if ( blog.user.toString() !== decodedToken.id.toString() ) {
      return response.status(401).json({ error: 'user not authorized to delete this blog' })
    }
    await blog.delete()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

/* 4.14* blogilistan laajennus, step2 */
/* Toteuta sovellukseen mahdollisuus yksittäisen blogin muokkaamiseen. */

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = new Blog ({
    _id: request.params.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter