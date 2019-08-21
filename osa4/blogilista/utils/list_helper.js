
/* 4.3: apufunktioita ja yksikkötestejä, step1 */
/* Määrittele ensin funktio dummy joka saa parametrikseen taulukollisen blogeja ja palauttaa aina luvun 1 */

const dummy = (blogs) => {
  const number = 1
  return number
}

/* 4.4: apufunktioita ja yksikkötestejä, step2 */
/* Määrittele funktio totalLikes joka saa parametrikseen taulukollisen blogeja. Funktio palauttaa blogien yhteenlaskettujen tykkäysten eli likejen määrän. */
/* Määrittele funktiolle sopivat testit. Funktion testit kannattaa laittaa describe-lohkoon jolloin testien tulostus ryhmittyy miellyttävästi */

const totalLikes = (blogs) => {
  let likes = 0

  blogs.forEach(blog => {
    likes += blog.likes    
  });

  return likes
}

/* 4.5*: apufunktioita ja yksikkötestejä, step3 */
/* Määrittele funktio favoriteBlog joka saa parametrikseen taulukollisen blogeja. */
/* Funktio selvittää millä blogilla on eniten likejä. Jos suosikkeja on monta, riittää että funktio palauttaa niistä jonkun. */

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let favorite = blogs[0]
  
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return favorite
}

/* Seuraavissa tutustutaan Lodash-kirjastoon */

/* 4.6*: apufunktioita ja yksikkötestejä, step4 */
/* Määrittele funktio mostBlogs joka saa parametrikseen taulukollisen blogeja. Funktio selvittää kirjoittajan, kenellä on eniten blogeja */

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  /* Asetetaan ensimmäisen blogin kirjoittaja alustavasti olemaan kirjoittaja, jolla eniten blogeja, ja vain tämä yksi blogi mukamas */
  let most = { 'author': blogs[0].author, 'blogs': 1 }

  /* Käydään kaikki blogit yksitellen läpi */
  blogs.forEach(blog => {

    /* Etsitään kaikki kyseisen blogin kirjoittajan blogit */
    let allBlogs = blogs.filter(ablog => ablog.author === blog.author)

    /* Jos kyseisen kirjoittajan kaikkien blogien lukumäärä oli suurempi, kuin ylhäällä oleva, niin päivitetään muuttuja */
    if (allBlogs.length > most.blogs) {
      most.author = allBlogs[0].author
      most.blogs = allBlogs.length
    }
  })

  return most
}

/* 4.7*: apufunktioita ja yksikkötestejä, step5 */
/* Määrittele funktio mostLikes joka saa parametrikseen taulukollisen blogeja. Funktio selvittää kirjoittajan, kenen blogeilla on eniten likejä */

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let most = { 'author': blogs[0].author, 'likes': blogs[0].likes }

  blogs.forEach(blog => {

    let allBlogs = blogs.filter(ablog => ablog.author === blog.author)
    /* Lasketaan yhteen kyseisen kirjoittajan kaikkien blogien tykkäyksien määrät */
    let likes = 0
    allBlogs.forEach(oneblog => {
      likes += oneblog.likes
    })

    if (likes > most.likes) {
      most.author = allBlogs[0].author
      most.likes = likes
    }
  })

  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
