const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    author: 'Essi Esimerkki',
    url: 'www.youdontsayso.com',
    likes: 5,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'esmerkki',
      name: 'Essi Esimerkki'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Browser can execute only javascript',
    author: 'Mikko Matemaatikko',
    url: 'www.youbetterbelieveit.com',
    likes: 3,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mmtikko',
      name: 'Mikko Matemaatikko'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'The most important methods of HTTP are GET and POST',
    author: 'Berry Bentley',
    url: 'www.itistrue.com',
    likes: 7,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'bbley',
      name: 'Berry Bentley'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  let token = `bearer ${newToken}`
}

export default { getAll, setToken }