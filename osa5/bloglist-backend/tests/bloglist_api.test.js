const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

/* Blog */

describe('when there is initially two blogs at db', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

  /* 4.8: blogilistan testit, step 1 */
  /* Tee supertest-kirjastolla testit blogilistan osoitteeseen /api/blogs tapahtuvalle HTTP GET -pyynnölle. */
  /* Testaa, että sovellus palauttaa oikean määrän JSON-muotoisia blogeja. */

  test('correct amount of blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length)
  })

  /* 4.9*: blogilistan testit, step2 */
  /* Tee testi, joka varmistaa että palautettujen blogien identifioivan kentän tulee olla nimeltään id, */
  /* oletusarvoisestihan tietokantaan talletettujen olioiden tunnistekenttä on _id. */

  test('id fields name is id not _id', async() => {
    const blogs = await helper.blogsInDb()

    expect(blogs[0]).toBeDefined()
    expect(blogs[0]).toHaveProperty('id')
  })

  /* 4.10: blogilistan testit, step3 */
  /* Tee testi joka varmistaa että sovellukseen voi lisätä blogeja osoitteeseen /api/blogs tapahtuvalla HTTP POST -pyynnölle. */
  /* Testaa ainakin, että blogien määrä kasvaa yhdellä. Voit myös varmistaa, että oikeansisältöinen blogi on lisätty järjestelmään. */

  test('creation succeeds with valid blog', async() => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
  })

  /* 4.11*: blogilistan testit, step4 */
  /* Tee testi joka varmistaa, että jos kentälle likes ei anneta arvoa, asetetaan sen arvoksi 0. */
  /* Laajenna ohjelmaa siten, että testi menee läpi. */

  test('if field `likes` is not given a value it is set to zero', async() => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }

    const blog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blog.body.likes).toBe(0)
  })

  /* 4.12*: blogilistan testit, step5 */
  /* Tee testit blogin lisäämiselle, joka varmistaa, että jos uusi blogi ei sisällä kenttiä title ja url, pyyntöön vastataan statuskoodilla 400 Bad request */
  /* Laajenna toteutusta siten, että testit menevät läpi. */

  test('creation fails with proper statuscode and message if title or url are not given', async() => {
    const newBlog = {
      author: "Robert C. Martin",
      likes: 2
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`title` is required')
    expect(result.body.error).toContain('`url` is required')

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length)
  })

  /* 4.13 blogilistan laajennus, step1 */
  /* Saat toteuttaa ominaisuudelle testit jos haluat. */

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  /* 4.14* blogilistan laajennus, step2 */
  /* Saat toteuttaa ominaisuudelle testit jos haluat. */

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.title = "Updated title"

    const updated = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
    
    expect(updated.body.title).toBe("Updated title")
  })
})

/* User */

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  /* 4.16*: blogilistan laajennus, step5 */
  /* Tee myös testit, jotka varmistavat, että virheellisiä käyttäjiä ei luoda, ja että virheellisen */
  /* käyttäjän luomisoperaatioon vastaus on järkevä statuskoodin ja virheilmoituksen osalta */

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Esimerkki',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  
  test('creation fails with proper statuscode and message if username is shorter than three characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'es',
      name: 'Esimerkki',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'esmes',
      name: 'Esimerkki'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('content missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  
  test('creation fails with proper statuscode and message if password is shorter than three characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'esmes',
      name: 'Esimerkki',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
